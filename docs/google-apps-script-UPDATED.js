// ============================================================
// VERSION MISE À JOUR — avec envoi automatique des liens d'accès
// Modifications vs original :
//   1. setConfig() : ajout APP_URL
//   2. getConfig() : ajout appUrl
//   3. replaceVariables() : ajout {{activation_link}}
//   4. maybeSendIdentifiantEmail() : génère le lien via API avant d'envoyer
//   5. doPost() : NOUVEAU — reçoit les demandes de "mot de passe oublié"
// ============================================================

const SHEET_NAMES = {
  prospects: "Prospects",
  templates: "Templates",
  logs: "Logs Emails",
};

const HEADERS = {
  demandeId: "demande_id",
  dateDemande: "date_demande",
  source: "source",
  statut: "statut",
  prenom: "prenom",
  nom: "nom",
  email: "email",
  telephone: "telephone",
  entreprise: "entreprise",
  ville: "ville",
  typeClient: "type_client",
  offre: "offre",
  objectif: "objectif",
  message: "message",

  mailValeurEnvoyeAt: "mail_valeur_envoye_at",
  appelEffectueAt: "appel_effectue_at",
  devisEnvoyeAt: "devis_envoye_at",
  paiementRecuAt: "paiement_recu_at",
  relanceDevisEnvoyeeAt: "relance_devis_envoyee_at",

  remerciementEnvoyeAt: "remerciement_envoye_at",
  confirmationPaiementEnvoyeeAt: "confirmation_paiement_envoyee_at",

  prochaineAction: "prochaine_action",
  notes: "notes",

  isFinishedCall: "is_finished_call",
  isEnvoieDevis: "is_envoie_devis",
  isPaiementRecu: "is_paiement_recu",
  identifiantRecuAt: "identifiant_recu_at",
  dateHeureRdv: "date_heure_rdv",
  timezoneRdv: "timezone_rdv",
  rdv: "rendez_vous"
};

const DATABASE_SYNC_HEADERS = [
  HEADERS.demandeId,
  HEADERS.dateDemande,
  HEADERS.source,
  HEADERS.statut,
  HEADERS.prenom,
  HEADERS.nom,
  HEADERS.email,
  HEADERS.telephone,
  HEADERS.entreprise,
  HEADERS.ville,
  HEADERS.typeClient,
  HEADERS.offre,
  HEADERS.objectif,
  HEADERS.message,
  HEADERS.dateHeureRdv,
  HEADERS.timezoneRdv,
  HEADERS.rdv
];

// ── MODIFICATION 1 : ajout de APP_URL ─────────────────────────────────────────
function setConfig() {
  const properties = PropertiesService.getScriptProperties();
  properties.setProperties({
    API_URL: "https://optimal-logic.com/api/admin/prospects-sync",
    API_SECRET: "TON_SECRET",
    FROM_ALIAS: "contact@optimal-logic.com",
    FROM_NAME: "OptimalLogic",
    RDV_LINK: "https://optimallogic.fr/prise-de-rdv",
    CLIENT_AREA_LINK: "https://optimallogic.fr/connexion",
    CONTACT_LINK: "https://optimallogic.fr/contact",
    APP_URL: "https://optimal-logic.com",  // ← AJOUTÉ
  });
}

// ── MODIFICATION 2 : ajout de appUrl ──────────────────────────────────────────
function getConfig() {
  const properties = PropertiesService.getScriptProperties();
  return {
    apiUrl: properties.getProperty("API_URL"),
    apiSecret: properties.getProperty("API_SECRET"),
    fromAlias: properties.getProperty("FROM_ALIAS"),
    fromName: properties.getProperty("FROM_NAME") || "OptimalLogic",
    rdvLink: properties.getProperty("RDV_LINK"),
    clientAreaLink: properties.getProperty("CLIENT_AREA_LINK"),
    contactLink: properties.getProperty("CONTACT_LINK"),
    appUrl: properties.getProperty("APP_URL"),  // ← AJOUTÉ
  };
}

function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) throw new Error(`Onglet introuvable: ${sheetName}`);
  return sheet;
}

function isTruthy(value) {
  if (value === true) return true;
  const normalizedValue = String(value).trim().toLowerCase();
  return ["true", "oui", "yes", "1", "x"].includes(normalizedValue);
}

function getHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map((header) => String(header).trim());
}

function getRowsAsObjects(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map((header) => String(header).trim());
  const rows = values.slice(1);
  return rows.map((row) => {
    const object = {};
    headers.forEach((header, index) => { object[header] = row[index]; });
    return object;
  });
}

function toSheetDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date;
}

function valuesAreDifferent(currentValue, newValue) {
  if (currentValue instanceof Date || newValue instanceof Date) {
    const currentDate = currentValue instanceof Date ? currentValue : new Date(currentValue);
    const newDate = newValue instanceof Date ? newValue : new Date(newValue);
    if (Number.isNaN(currentDate.getTime()) || Number.isNaN(newDate.getTime())) {
      return String(currentValue || "") !== String(newValue || "");
    }
    return currentDate.getTime() !== newDate.getTime();
  }
  return String(currentValue || "") !== String(newValue || "");
}

function formatDateColumn(sheet, headerName) {
  const headers = getHeaders(sheet);
  const columnIndex = headers.indexOf(headerName) + 1;
  if (columnIndex === 0) throw new Error(`Colonne introuvable: ${headerName}`);

  try {
    sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1, 1).setNumberFormat("dd/MM/yyyy HH:mm");
    SpreadsheetApp.flush();
  } catch (err) {
    Logger.log(`Formatage ignoré pour ${headerName} : ${err.message}`);
  }
}

function updateCellByHeader(sheet, rowNumber, headerName, value) {
  const headers = getHeaders(sheet);
  const columnIndex = headers.indexOf(headerName) + 1;
  if (columnIndex === 0) throw new Error(`Colonne introuvable: ${headerName}`);
  sheet.getRange(rowNumber, columnIndex).setValue(value);
}

function syncProspectsFromApi() {
  const config = getConfig();
  const response = UrlFetchApp.fetch(config.apiUrl, {
    method: "get",
    headers: { Authorization: `Bearer ${config.apiSecret}` },
    muteHttpExceptions: true,
  });
  const statusCode = response.getResponseCode();
  const body = response.getContentText();
  if (statusCode !== 200) throw new Error(`Erreur API ${statusCode}: ${body}`);
  const payload = JSON.parse(body);
  const prospects = payload.prospects || [];
  const sheet = getSheet(SHEET_NAMES.prospects);
  const headers = getHeaders(sheet);
  const rows = getRowsAsObjects(sheet);
  const rowNumberByDemandeId = new Map();
  rows.forEach((row, index) => {
    const demandeId = String(row[HEADERS.demandeId] || "").trim();
    if (demandeId) rowNumberByDemandeId.set(demandeId, index + 2);
  });
  const newRows = [];
  prospects.forEach((prospect) => {
    const demandeId = String(prospect.demande_id || "").trim();
    if (!demandeId) return;
    const dbValues = {
      [HEADERS.demandeId]: prospect.demande_id || "",
      [HEADERS.dateDemande]: toSheetDate(prospect.date_demande),
      [HEADERS.source]: prospect.source || "",
      [HEADERS.statut]: prospect.statut || "nouvelle_demande",
      [HEADERS.prenom]: prospect.prenom || "",
      [HEADERS.nom]: prospect.nom || "",
      [HEADERS.email]: prospect.email || "",
      [HEADERS.telephone]: prospect.telephone || "",
      [HEADERS.entreprise]: prospect.entreprise || "",
      [HEADERS.ville]: prospect.ville || "",
      [HEADERS.typeClient]: prospect.type_client || "",
      [HEADERS.offre]: prospect.offre || "",
      [HEADERS.objectif]: prospect.objectif || "",
      [HEADERS.message]: prospect.message || "",
      [HEADERS.dateHeureRdv]: toSheetDate(prospect.appointment_start_at),
      [HEADERS.timezoneRdv]: prospect.appointment_timezone || "Europe/Paris",
    };
    const existingRowNumber = rowNumberByDemandeId.get(demandeId);
    if (!existingRowNumber) {
      const newRow = headers.map((header) => {
        if (DATABASE_SYNC_HEADERS.includes(header)) return dbValues[header] || "";
        if (header === HEADERS.prochaineAction) {
          return prospect.appointment_start_at ? "Envoyer rappel RDV H-1" : "Envoyer mail valeur H+1";
        }
        return "";
      });
      newRows.push(newRow);
      return;
    }
    DATABASE_SYNC_HEADERS.forEach((headerName) => {
      const columnIndex = headers.indexOf(headerName) + 1;
      if (columnIndex === 0) throw new Error(`Colonne introuvable: ${headerName}`);
      const currentValue = sheet.getRange(existingRowNumber, columnIndex).getValue();
      const newValue = dbValues[headerName] || "";
      if (valuesAreDifferent(currentValue, newValue)) sheet.getRange(existingRowNumber, columnIndex).setValue(newValue);
    });
  });
  if (newRows.length > 0) sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, headers.length).setValues(newRows);
  formatDateColumn(sheet, HEADERS.dateDemande);
  formatDateColumn(sheet, HEADERS.dateHeureRdv);
}

function isOlderThanHours(dateValue, hours) {
  if (!dateValue) return false;
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours >= hours;
}

function isOlderThanDays(dateValue, days) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= days;
}

function getTemplate(templateId) {
  const sheet = getSheet(SHEET_NAMES.templates);
  const rows = getRowsAsObjects(sheet);
  return rows.find((row) => row.template_id === templateId);
}

// ── MODIFICATION 3 : ajout de {{activation_link}} ─────────────────────────────
function replaceVariables(text, row) {
  if (!text) return "";
  const config = getConfig();
  return String(text)
    .replaceAll("{{prenom}}", row.prenom || "")
    .replaceAll("{{nom}}", row.nom || "")
    .replaceAll("{{email}}", row.email || "")
    .replaceAll("{{entreprise}}", row.entreprise || "")
    .replaceAll("{{ville}}", row.ville || "")
    .replaceAll("{{offre}}", row.offre || "")
    .replaceAll("{{objectif}}", row.objectif || "")
    .replaceAll("{{message}}", row.message || "")
    .replaceAll("{{rdv_link}}", config.rdvLink || "https://www.optimal-logic.com/prise-de-rdv")
    .replaceAll("{{client_area_link}}", config.clientAreaLink || "https://www.optimal-logic.com/contact")
    .replaceAll("{{contact_link}}", config.contactLink || "https://optimallogic.fr/contact")
    .replaceAll("{{temporary_password}}", row.temporary_password || "")
    .replaceAll("{{password_changed_at}}", row.password_changed_at || "")
    .replaceAll("{{date_heure_rdv}}", row.dateHeureRdv || "")
    .replaceAll("{{timezone_rdv}}}", row.timezoneRdv || "")
    .replaceAll("{{activation_link}}", row.activation_link || "");  // ← AJOUTÉ
}

function wrapEmailLayout(contentHtml) {
  return `
    <div style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#ffffff;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="margin-bottom:24px;">
          <div style="display:inline-flex;align-items:center;gap:12px;">
            <div style="width:42px;height:42px;border-radius:14px;background:linear-gradient(110deg,#ffffff 0%,#9f9f9f 100%);color:#050505;font-size:15px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;">OL</div>
            <div>
              <div style="font-size:22px;font-weight:700;letter-spacing:-0.4px;color:#ffffff;">OptimalLogic</div>
              <div style="font-size:14px;color:#b5b5bd;margin-top:4px;">Solutions digitales pour transformer votre visibilité en clients.</div>
            </div>
          </div>
        </div>
        <div style="background:#121214;border:1px solid rgba(255,255,255,0.12);border-radius:18px;padding:28px;color:#ffffff;">${contentHtml}</div>
        <p style="margin:20px 0 0;font-size:13px;line-height:1.5;color:#787882;">OptimalLogic — Accompagnement digital pour commerces, TPE/PME et startups.</p>
      </div>
    </div>
  `;
}

function logEmail({ demandeId, email, templateId, statut, erreur }) {
  const sheet = getSheet(SHEET_NAMES.logs);
  sheet.appendRow([new Date(), demandeId, email, templateId, statut, erreur]);
}

function sendTemplateEmail(row, templateId) {
  const template = getTemplate(templateId);
  if (!template) throw new Error(`Template introuvable: ${templateId}`);
  const subject = replaceVariables(template.objet, row);
  const rawHtmlBody = replaceVariables(template.contenu_html, row);
  const htmlBody = wrapEmailLayout(rawHtmlBody);
  const plainBody = htmlBody.replace(/<[^>]*>/g, " ");
  const config = getConfig();
  const options = { htmlBody, name: config.fromName };
  const aliases = GmailApp.getAliases();
  if (config.fromAlias && aliases.includes(config.fromAlias)) options.from = config.fromAlias;
  GmailApp.sendEmail(row.email, subject, plainBody, options);
  logEmail({ demandeId: row.demande_id, email: row.email, templateId, statut: "envoye", erreur: "" });
}

function isOneHourBeforeAppointment(appointmentDateValue) {
  if (!appointmentDateValue) return false;
  const appointmentDate = appointmentDateValue instanceof Date ? appointmentDateValue : new Date(appointmentDateValue);
  if (isNaN(appointmentDate.getTime())) return false;
  const now = new Date();
  const diffMs = appointmentDate.getTime() - now.getTime();
  const diffMinutes = diffMs / (1000 * 60);
  return diffMinutes >= 55 && diffMinutes <= 65;
}

function maybeSendValueEmail(sheet, row, rowNumber) {
  if (row[HEADERS.mailValeurEnvoyeAt]) return;
  let templateId = "valeur_contact";
  if (row[HEADERS.source] === "contact") {
    if (row[HEADERS.typeClient] === "commerce") templateId = "valeur_contact_commerce";
    if (row[HEADERS.typeClient] === "tpe_pme") templateId = "valeur_contact_tpe_pme";
    if (row[HEADERS.typeClient] === "startup") templateId = "valeur_contact_startup";
  }
  if (row[HEADERS.source] === "tarifs") {
    if (row[HEADERS.typeClient] === "commerce") templateId = "valeur_tarif_commerce";
    if (row[HEADERS.typeClient] === "tpe_pme") templateId = "valeur_tarif_tpe_pme";
    if (row[HEADERS.typeClient] === "startup") templateId = "valeur_tarif_startup";
  }
  if (row[HEADERS.source] === "prise_de_rdv") {
    templateId = "valeur_rdv";
    updateCellByHeader(sheet, rowNumber, HEADERS.rdv, "yes");
  }
  sendTemplateEmail(row, templateId);
  updateCellByHeader(sheet, rowNumber, HEADERS.mailValeurEnvoyeAt, new Date());
  updateCellByHeader(sheet, rowNumber, HEADERS.prochaineAction, "Attendre réponse / appel");
}

function maybeSendQuoteReminderRdv(sheet, row, rowNumber) {
  if (row[HEADERS.rdv]) return;
  if (!row[HEADERS.mailValeurEnvoyeAt]) return;
  if (!isOneHourBeforeAppointment(row[HEADERS.dateHeureRdv])) return;
  sendTemplateEmail(row, "rappel_rdv");
  updateCellByHeader(sheet, rowNumber, HEADERS.rdv, new Date());
}

function maybeSendQuoteReminderEmail(sheet, row, rowNumber) {
  if (!row[HEADERS.devisEnvoyeAt]) return;
  if (row[HEADERS.paiementRecuAt] || isTruthy(row[HEADERS.isPaiementRecu])) return;
  if (row[HEADERS.relanceDevisEnvoyeeAt]) return;
  if (!isOlderThanDays(row[HEADERS.devisEnvoyeAt], 3)) return;
  sendTemplateEmail(row, "relance_devis");
  updateCellByHeader(sheet, rowNumber, HEADERS.relanceDevisEnvoyeeAt, new Date());
  updateCellByHeader(sheet, rowNumber, HEADERS.prochaineAction, "Attendre retour après relance devis");
}

function maybeSendThanksEmail(sheet, row, rowNumber) {
  if (!isTruthy(row[HEADERS.isFinishedCall])) return;
  if (row[HEADERS.remerciementEnvoyeAt]) return;
  sendTemplateEmail(row, "remerciement_id");
  updateCellByHeader(sheet, rowNumber, HEADERS.remerciementEnvoyeAt, new Date());
  updateCellByHeader(sheet, rowNumber, HEADERS.prochaineAction, "Envoyer ou suivre le devis");
}

function maybeSendDevisEmail(sheet, row, rowNumber) {
  if (!isTruthy(row[HEADERS.isEnvoieDevis])) return;
  if (row[HEADERS.devisEnvoyeAt]) return;
  sendTemplateEmail(row, "envoi_devis_id");
  updateCellByHeader(sheet, rowNumber, HEADERS.devisEnvoyeAt, new Date());
  updateCellByHeader(sheet, rowNumber, HEADERS.prochaineAction, "Attendre paiement ou retour client");
}

function maybeSendConfirmationPaymentEmail(sheet, row, rowNumber) {
  if (!isTruthy(row[HEADERS.isPaiementRecu])) return;
  if (row[HEADERS.confirmationPaiementEnvoyeeAt]) return;
  sendTemplateEmail(row, "paiement_recu_id");
  updateCellByHeader(sheet, rowNumber, HEADERS.confirmationPaiementEnvoyeeAt, new Date());
  updateCellByHeader(sheet, rowNumber, HEADERS.prochaineAction, "Démarrer onboarding client");
}

// ── MODIFICATION 4 : génère le lien d'activation avant d'envoyer l'email ──────
function maybeSendIdentifiantEmail(sheet, row, rowNumber) {
  if (!isTruthy(row[HEADERS.isPaiementRecu])) return;
  if (row[HEADERS.confirmationPaiementEnvoyeeAt]) return;
  if (row[HEADERS.identifiantRecuAt]) return;

  // Appel à notre API pour générer le lien d'activation sécurisé
  const config = getConfig();
  try {
    const response = UrlFetchApp.fetch(`${config.appUrl}/api/admin/clients/generate-link`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": config.apiSecret,
      },
      payload: JSON.stringify({ email: row.email }),
      muteHttpExceptions: true,
    });
    const data = JSON.parse(response.getContentText());
    if (!data.link) throw new Error("Lien non généré : " + (data.error || "inconnu"));
    row.activation_link = data.link;
  } catch (err) {
    logEmail({
      demandeId: row.demande_id,
      email: row.email,
      templateId: "envoi_identifiant_id",
      statut: "erreur",
      erreur: "Génération lien: " + err.message,
    });
    return;
  }

  sendTemplateEmail(row, "envoi_identifiant_id");
  updateCellByHeader(sheet, rowNumber, HEADERS.identifiantRecuAt, new Date());
}

// ── doPost : reset mdp, notif admin nouvelle demande, invitation membre ──────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const config = getConfig();

    if (data.secret !== config.apiSecret) {
      logEmail({ demandeId: data.demande_id || "doPost", email: data.email || "", templateId: data.template_id || "?", statut: "erreur", erreur: "Secret invalide (doPost)" });
      return ContentService
        .createTextOutput(JSON.stringify({ error: "Non autorisé" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const templateId = data.template_id || "reset_mot_de_passe";

    // Notification admin nouvelle demande — HTML construit directement
    if (templateId === "notification_admin") {
      const adminEmail = data.admin_email;
      if (!adminEmail) throw new Error("admin_email manquant");

      const sourceLabels = { contact: "Formulaire contact", tarifs: "Page tarifs", prise_de_rdv: "Prise de RDV" };
      const typeLabels = { commerce: "Commerce local", tpe_pme: "TPE / PME", startup: "Startup", autre: "Autre" };
      const sourceLabel = sourceLabels[data.source] || data.source || "—";
      const typeLabel = typeLabels[data.type_client] || data.type_client || "—";

      const contentHtml = `
        <p style="margin:0 0 14px;font-size:16px;color:#ffffff;">Une nouvelle demande a été enregistrée.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Provenance</td><td style="padding:5px 0;color:#ffffff;">${sourceLabel}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Type</td><td style="padding:5px 0;color:#ffffff;">${typeLabel}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Nom</td><td style="padding:5px 0;color:#ffffff;">${data.prenom || ""} ${data.nom || ""}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Email</td><td style="padding:5px 0;color:#ffffff;">${data.email || ""}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Téléphone</td><td style="padding:5px 0;color:#ffffff;">${data.telephone || "—"}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Entreprise</td><td style="padding:5px 0;color:#ffffff;">${data.entreprise || "—"}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Ville</td><td style="padding:5px 0;color:#ffffff;">${data.ville || "—"}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Offre</td><td style="padding:5px 0;color:#ffffff;">${data.offre || "—"}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Objectif</td><td style="padding:5px 0;color:#ffffff;">${data.objectif || "—"}</td></tr>
          <tr><td style="padding:5px 12px 5px 0;color:#9f9faf;white-space:nowrap;">Message</td><td style="padding:5px 0;color:#ffffff;">${data.message || "—"}</td></tr>
        </table>
      `;
      const htmlBody = wrapEmailLayout(contentHtml);
      const plainBody = htmlBody.replace(/<[^>]*>/g, " ");
      const subject = `[OptimalLogic] Nouvelle demande — ${sourceLabel}`;
      const options = { htmlBody, name: config.fromName };
      const aliases = GmailApp.getAliases();
      if (config.fromAlias && aliases.includes(config.fromAlias)) options.from = config.fromAlias;
      GmailApp.sendEmail(adminEmail, subject, plainBody, options);
      logEmail({ demandeId: data.demande_id || "notif_admin", email: adminEmail, templateId: "notification_admin", statut: "envoye", erreur: "" });

      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Template depuis la feuille (reset_mot_de_passe, invitation_membre, etc.)
    const row = {
      email: data.email,
      prenom: data.prenom || "",
      nom: data.nom || "",
      activation_link: data.link || "",
      demande_id: data.demande_id || templateId,
    };
    sendTemplateEmail(row, templateId);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    logEmail({ demandeId: "doPost", email: "", templateId: "?", statut: "erreur", erreur: "doPost: " + err.message });
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function processScheduledEmails() {
  const sheet = getSheet(SHEET_NAMES.prospects);
  const rows = getRowsAsObjects(sheet);
  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    if (!row.email || !row.demande_id) return;
    try {
      if (maybeSendValueEmail(sheet, row, rowNumber)) return;
      if (maybeSendQuoteReminderRdv(sheet, row, rowNumber)) return;
      if (maybeSendThanksEmail(sheet, row, rowNumber)) return;
      if (maybeSendDevisEmail(sheet, row, rowNumber)) return;
      if (maybeSendConfirmationPaymentEmail(sheet, row, rowNumber)) return;
      if (maybeSendIdentifiantEmail(sheet, row, rowNumber)) return;
      if (maybeSendQuoteReminderEmail(sheet, row, rowNumber)) return;
    } catch (error) {
      logEmail({ demandeId: row.demande_id, email: row.email, templateId: "erreur_process", statut: "erreur", erreur: error.message });
    }
  });
}

function installHourlyTrigger() {
  ScriptApp.newTrigger("runAutomation").timeBased().everyMinutes(5).create();
}

function runAutomation() {
  syncProspectsFromApi();
  processScheduledEmails();
}
