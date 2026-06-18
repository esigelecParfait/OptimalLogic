from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table,
    TableStyle, HRFlowable
)
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER

output_path = r"C:\Users\fmtch\OptimalLogic\docs\Sequence_Emails_OptimalLogic.pdf"

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    topMargin=2*cm,
    bottomMargin=2*cm,
    leftMargin=2*cm,
    rightMargin=2*cm,
)

styles = getSampleStyleSheet()

# Custom styles
styles.add(ParagraphStyle(
    "DocTitle", parent=styles["Title"], fontSize=22, spaceAfter=6,
    textColor=HexColor("#0f172a"), fontName="Helvetica-Bold",
))
styles.add(ParagraphStyle(
    "DocSubtitle", parent=styles["Normal"], fontSize=11, spaceAfter=30,
    textColor=HexColor("#64748b"), alignment=TA_CENTER,
))
styles.add(ParagraphStyle(
    "MailTitle", parent=styles["Heading1"], fontSize=14, spaceBefore=20,
    spaceAfter=6, textColor=HexColor("#0f172a"), fontName="Helvetica-Bold",
))
styles.add(ParagraphStyle(
    "MailSubtitle", parent=styles["Heading2"], fontSize=11, spaceBefore=14,
    spaceAfter=4, textColor=HexColor("#334155"), fontName="Helvetica-Bold",
))
styles.add(ParagraphStyle(
    "Objet", parent=styles["Normal"], fontSize=10, spaceBefore=6,
    spaceAfter=8, textColor=HexColor("#0f172a"), fontName="Helvetica-BoldOblique",
))
styles.add(ParagraphStyle(
    "Body", parent=styles["Normal"], fontSize=10, spaceAfter=6,
    leading=15, textColor=HexColor("#1e293b"),
))
styles.add(ParagraphStyle(
    "BodyBold", parent=styles["Normal"], fontSize=10, spaceAfter=6,
    leading=15, textColor=HexColor("#1e293b"), fontName="Helvetica-Bold",
))
styles.add(ParagraphStyle(
    "BulletItem", parent=styles["Normal"], fontSize=10, spaceAfter=4,
    leading=15, textColor=HexColor("#1e293b"), leftIndent=18,
    bulletIndent=6,
))
styles.add(ParagraphStyle(
    "CTA", parent=styles["Normal"], fontSize=10, spaceBefore=10,
    spaceAfter=6, textColor=HexColor("#0f172a"), fontName="Helvetica-Bold",
))
styles.add(ParagraphStyle(
    "Signature", parent=styles["Normal"], fontSize=10, spaceBefore=10,
    spaceAfter=4, textColor=HexColor("#64748b"),
))
styles.add(ParagraphStyle(
    "SectionLabel", parent=styles["Normal"], fontSize=8, spaceBefore=20,
    spaceAfter=2, textColor=HexColor("#94a3b8"),
    fontName="Helvetica-Bold",
))
styles.add(ParagraphStyle(
    "TableHeader", parent=styles["Normal"], fontSize=9,
    textColor=HexColor("#ffffff"), fontName="Helvetica-Bold",
))
styles.add(ParagraphStyle(
    "TableCell", parent=styles["Normal"], fontSize=9,
    textColor=HexColor("#1e293b"),
))

story = []

# ── COVER ──
story.append(Spacer(1, 4*cm))
story.append(Paragraph("OPTIMAL LOGIC", styles["DocTitle"]))
story.append(Paragraph("Séquence emails commerciaux", styles["DocSubtitle"]))
story.append(Spacer(1, 1*cm))
story.append(HRFlowable(width="60%", thickness=1, color=HexColor("#cbd5e1"), spaceAfter=20, spaceBefore=10))
story.append(Paragraph("Document de référence pour l’intégration technique (Apps Script)", styles["DocSubtitle"]))
story.append(Paragraph("Personne 1 — Rédaction commerciale", styles["DocSubtitle"]))
story.append(PageBreak())


def add_separator():
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#e2e8f0"), spaceAfter=8, spaceBefore=8))

def add_mail_block(title, objet, paragraphs):
    story.append(Paragraph(title, styles["MailTitle"]))
    story.append(Paragraph(f"Objet : {objet}", styles["Objet"]))
    for p in paragraphs:
        if p.startswith("BOLD:"):
            story.append(Paragraph(p[5:], styles["BodyBold"]))
        elif p.startswith("BULLET:"):
            story.append(Paragraph(p[7:], styles["BulletItem"], bulletText="•"))
        elif p.startswith("CTA:"):
            story.append(Paragraph(p[4:], styles["CTA"]))
        elif p == "SIG":
            story.append(Paragraph("À très vite,", styles["Signature"]))
            story.append(Paragraph("L’équipe Optimal Logic", styles["Signature"]))
        elif p == "CORD":
            story.append(Paragraph("Cordialement,", styles["Signature"]))
            story.append(Paragraph("L’équipe Optimal Logic", styles["Signature"]))
        elif p == "SEP":
            add_separator()
        else:
            story.append(Paragraph(p, styles["Body"]))


# ═══════════════════════════════════════════════════════
# MAIL 2A — TARIFS / CONTACT
# ═══════════════════════════════════════════════════════
story.append(Paragraph("TRONC COMMUN", styles["SectionLabel"]))
add_mail_block(
    "MAIL 2 — Valeur concrète (H+2) — Variante Tarifs / Contact",
    "{{prénom}}, votre présence digitale mérite mieux",
    [
        "Bonjour {{prénom}},",
        "Merci pour votre demande sur notre site. Nous l’avons bien reçue et nous la traitons personnellement.",
        "En attendant notre échange, voici ce que nous observons chez la plupart des {{type_client}} que nous accompagnons :",
        "BULLET:Des clients potentiels qui cherchent sur Google, mais qui ne trouvent pas assez d’informations pour faire confiance.",
        "BULLET:Des demandes qui arrivent par plusieurs canaux sans vrai suivi.",
        "BULLET:Une image en ligne qui ne reflète pas la qualité réelle du travail.",
        "Notre rôle est simple : transformer votre visibilité en un système qui vous rapporte des appels, des rendez-vous et des demandes concrètes.",
        "Si vous êtes disponible pour un appel de 15 minutes, nous pourrons analyser ensemble votre situation et vous dire exactement ce qui peut être amélioré.",
        "CTA:→ Réserver un créneau : {{lien_prise_rdv}}",
        "SIG",
    ]
)
story.append(PageBreak())


# ═══════════════════════════════════════════════════════
# MAIL 2B — PRISE DE RDV
# ═══════════════════════════════════════════════════════
add_mail_block(
    "MAIL 2 — Valeur concrète (H+2) — Variante Prise de RDV",
    "{{prénom}}, votre rendez-vous est bien noté",
    [
        "Bonjour {{prénom}},",
        "Merci d’avoir réservé un créneau avec nous. Nous avons bien noté votre rendez-vous et nous le préparons sérieusement.",
        "Pour que cet échange soit le plus utile possible, nous allons regarder en amont votre présence actuelle : fiche Google, site web, parcours client et points de contact visibles.",
        "Si vous souhaitez nous aider à préparer l’appel, vous pouvez nous envoyer en réponse à ce mail :",
        "BULLET:Le lien vers votre fiche Google Business (si vous en avez une)",
        "BULLET:Le lien vers votre site web (si vous en avez un)",
        "BULLET:Toute question ou point précis que vous aimeriez aborder",
        "Notre objectif pour cet appel : vous donner une vision claire de ce qui fonctionne, ce qui manque, et ce qui peut être amélioré rapidement.",
        "SIG",
    ]
)
story.append(PageBreak())


# ═══════════════════════════════════════════════════════
# MAIL 3 — APRÈS APPEL
# ═══════════════════════════════════════════════════════
add_mail_block(
    "MAIL 3 — Après l’appel commercial",
    "Résumé de notre échange, {{prénom}}",
    [
        "Bonjour {{prénom}},",
        "Merci pour le temps que vous nous avez accordé. C’était un plaisir d’échanger avec vous sur votre activité.",
        "Voici un résumé de ce que nous avons vu ensemble :",
        "BOLD:Votre situation actuelle :",
        "{{résumé_situation}}",
        "BOLD:Les points à améliorer :",
        "{{points_amélioration}}",
        "BOLD:Ce que nous vous recommandons :",
        "{{recommandation}}",
        "Nous vous préparons une proposition détaillée que vous recevrez très prochainement. Elle reprendra exactement ce dont nous avons discuté, sans surprise.",
        "Si vous avez des questions entre-temps, répondez simplement à ce mail.",
        "SIG",
    ]
)
story.append(PageBreak())


# ═══════════════════════════════════════════════════════
# MAIL 4 — ENVOI DU DEVIS
# ═══════════════════════════════════════════════════════
add_mail_block(
    "MAIL 4 — Envoi du devis",
    "Votre proposition — {{nom_offre}}",
    [
        "Bonjour {{prénom}},",
        "Suite à notre échange, voici votre proposition personnalisée.",
        "BOLD:Formule recommandée : {{nom_offre}}",
        "BOLD:Mise en place : {{prix_setup}} HT",
        "BOLD:Accompagnement mensuel : {{prix_mensuel}} HT / mois",
        "BOLD:Ce qui est inclus dans la mise en place :",
        "{{liste_setup}}",
        "BOLD:Ce qui est inclus chaque mois :",
        "{{liste_mensuel}}",
        "BOLD:Le résultat attendu :",
        "{{résultat_attendu}}",
        "Vous trouverez le devis complet en pièce jointe.",
        "Pour valider et lancer votre accompagnement, il vous suffit de régler la mise en place via le lien ci-dessous :",
        "CTA:→ Valider et payer : {{lien_paiement}}",
        "Si vous avez la moindre question, nous restons disponibles par mail ou par téléphone.",
        "CORD",
    ]
)
story.append(PageBreak())


# ═══════════════════════════════════════════════════════
# MAIL 5A — CONFIRMATION PAIEMENT
# ═══════════════════════════════════════════════════════
add_mail_block(
    "MAIL 5A — Confirmation paiement + onboarding",
    "C’est parti, {{prénom}} — bienvenue chez Optimal Logic",
    [
        "Bonjour {{prénom}},",
        "Nous confirmons la bonne réception de votre paiement. Merci pour votre confiance.",
        "Voici ce qui se passe maintenant :",
        "BOLD:1. Sous 48h — Nous lançons l’audit de votre présence digitale actuelle.",
        "BOLD:2. Sous 5 jours ouvrés — Vous recevrez les premières actions mises en place avec un point de suivi.",
        "BOLD:3. Votre espace client — Vous pouvez suivre l’avancement ici : {{lien_espace_client}}",
        "Si nous avons besoin d’accès (fiche Google, site web, hébergeur...), nous vous contacterons directement.",
        "Pour toute question, répondez à ce mail ou utilisez le support dans votre espace client.",
        "Bienvenue à bord,",
        "CORD",
    ]
)

add_separator()
story.append(Spacer(1, 10))

# ═══════════════════════════════════════════════════════
# MAIL 5B — RELANCE J+3
# ═══════════════════════════════════════════════════════
add_mail_block(
    "MAIL 5B — Relance J+3 (devis non payé)",
    "{{prénom}}, votre proposition est toujours disponible",
    [
        "Bonjour {{prénom}},",
        "Nous revenons vers vous concernant la proposition que nous vous avons envoyée il y a quelques jours.",
        "Nous comprenons que c’est une décision importante. Si vous hésitez, voici quelques éléments qui peuvent vous aider :",
        "BULLET:Vous avez des questions ? Nous pouvons planifier un second appel rapide de 10 minutes pour y répondre.",
        "BULLET:Le budget est un frein ? Nous pouvons discuter d’un démarrage progressif adapté à votre situation.",
        "BULLET:Ce n’est pas le bon moment ? Aucun souci — dites-le nous et nous reviendrons vers vous quand vous le souhaitez.",
        "CTA:→ Valider et payer : {{lien_paiement}}",
        "CTA:→ Réserver un appel : {{lien_prise_rdv}}",
        "Quoi qu’il en soit, nous restons disponibles.",
        "CORD",
    ]
)
story.append(PageBreak())


# ═══════════════════════════════════════════════════════
# VARIANTES PAR TYPE DE CLIENT
# ═══════════════════════════════════════════════════════
story.append(Paragraph("VARIANTES DU MAIL 2 PAR TYPE DE CLIENT", styles["SectionLabel"]))
story.append(Spacer(1, 10))

add_mail_block(
    "Commerce local",
    "{{prénom}}, vos clients vous cherchent déjà sur Google",
    [
        "Bonjour {{prénom}},",
        "Merci pour votre demande. Nous l’avons bien reçue.",
        "Savez-vous que la majorité de vos clients potentiels passent par Google avant de vous appeler, de passer ou de réserver ? Ce qu’ils voient en quelques secondes — photos, avis, horaires, services — détermine souvent s’ils vous choisissent ou passent au suivant.",
        "Voici ce que nous constatons chez la plupart des commerces que nous accompagnons :",
        "BULLET:Une fiche Google incomplète ou peu attractive",
        "BULLET:Des avis clients peu nombreux ou sans réponse",
        "BULLET:Pas de moyen simple de réserver ou demander un devis en ligne",
        "Notre accompagnement commence par là : rendre votre fiche Google plus complète, plus rassurante et plus efficace pour transformer les recherches en appels et en visites.",
        "CTA:→ Réserver un appel gratuit de 15 min : {{lien_prise_rdv}}",
        "SIG",
    ]
)

add_separator()

add_mail_block(
    "TPE/PME",
    "{{prénom}}, combien de demandes passent à côté chaque mois ?",
    [
        "Bonjour {{prénom}},",
        "Merci pour votre demande. Nous l’avons bien reçue.",
        "Ce que nous observons chez beaucoup de TPE/PME, c’est que les demandes arrivent — par mail, téléphone, formulaire, WhatsApp — mais qu’il n’y a pas de système clair pour les suivre, les prioriser et les relancer.",
        "Résultat : des prospects oubliés, des réponses trop lentes, et des opportunités perdues sans même s’en rendre compte.",
        "Notre rôle est de mettre en place un parcours simple : un site qui donne envie de vous contacter, un système qui centralise les demandes, et un suivi qui vous permet de ne plus rien laisser passer.",
        "CTA:→ Réserver un appel gratuit de 15 min : {{lien_prise_rdv}}",
        "SIG",
    ]
)

add_separator()

add_mail_block(
    "Startup",
    "{{prénom}}, votre offre mérite d’être comprise plus vite",
    [
        "Bonjour {{prénom}},",
        "Merci pour votre demande. Nous l’avons bien reçue.",
        "Le défi principal d’une startup, ce n’est pas toujours le produit. C’est souvent la capacité à faire comprendre rapidement sa valeur, à capter l’attention et à transformer un visiteur curieux en prospect qualifié.",
        "Ce que nous voyons souvent :",
        "BULLET:Une proposition de valeur trop technique ou trop floue",
        "BULLET:Une landing page qui reçoit du trafic sans convertir",
        "BULLET:Pas de système pour qualifier et suivre les leads",
        "Nous aidons les startups à construire un parcours de conversion clair : message, landing page, formulaire intelligent, qualification et suivi — pour prouver la traction rapidement.",
        "CTA:→ Réserver un appel gratuit de 15 min : {{lien_prise_rdv}}",
        "SIG",
    ]
)
story.append(PageBreak())


# ═══════════════════════════════════════════════════════
# TABLE DES VARIABLES
# ═══════════════════════════════════════════════════════
story.append(Paragraph("RÉCAPITULATIF DES VARIABLES", styles["SectionLabel"]))
story.append(Paragraph(
    "Variables à intégrer dans Apps Script pour l’envoi automatisé",
    styles["MailTitle"],
))
story.append(Spacer(1, 10))

table_data = [
    [Paragraph("Variable", styles["TableHeader"]), Paragraph("Source", styles["TableHeader"])],
    [Paragraph("{{prénom}}", styles["TableCell"]), Paragraph("Champ firstname du formulaire", styles["TableCell"])],
    [Paragraph("{{type_client}}", styles["TableCell"]), Paragraph("Champ type_client (commerce / tpe_pme / startup)", styles["TableCell"])],
    [Paragraph("{{lien_prise_rdv}}", styles["TableCell"]), Paragraph("URL page /prise-de-rdv", styles["TableCell"])],
    [Paragraph("{{lien_paiement}}", styles["TableCell"]), Paragraph("Lien de paiement généré pour le devis", styles["TableCell"])],
    [Paragraph("{{lien_espace_client}}", styles["TableCell"]), Paragraph("URL page /espace-client", styles["TableCell"])],
    [Paragraph("{{nom_offre}}", styles["TableCell"]), Paragraph("Nom du pack choisi (ex: Commerce Intelligent)", styles["TableCell"])],
    [Paragraph("{{prix_setup}}", styles["TableCell"]), Paragraph("Prix mise en place du pack", styles["TableCell"])],
    [Paragraph("{{prix_mensuel}}", styles["TableCell"]), Paragraph("Prix abonnement mensuel", styles["TableCell"])],
    [Paragraph("{{liste_setup}}", styles["TableCell"]), Paragraph("Éléments inclus dans la mise en place", styles["TableCell"])],
    [Paragraph("{{liste_mensuel}}", styles["TableCell"]), Paragraph("Éléments inclus dans l’abonnement", styles["TableCell"])],
    [Paragraph("{{résultat_attendu}}", styles["TableCell"]), Paragraph("Champ result du pack", styles["TableCell"])],
    [Paragraph("{{résumé_situation}}", styles["TableCell"]), Paragraph("À remplir manuellement après l’appel", styles["TableCell"])],
    [Paragraph("{{points_amélioration}}", styles["TableCell"]), Paragraph("À remplir manuellement après l’appel", styles["TableCell"])],
    [Paragraph("{{recommandation}}", styles["TableCell"]), Paragraph("À remplir manuellement après l’appel", styles["TableCell"])],
    [Paragraph("{{page_origine}}", styles["TableCell"]), Paragraph("tarifs / contact / prise-de-rdv", styles["TableCell"])],
]

col_widths = [5.5*cm, 11*cm]
t = Table(table_data, colWidths=col_widths)
t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), HexColor("#0f172a")),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
    ("BACKGROUND", (0, 1), (-1, -1), HexColor("#f8fafc")),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [HexColor("#f8fafc"), HexColor("#ffffff")]),
    ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#e2e8f0")),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
]))
story.append(t)

# Build
doc.build(story)
print(f"PDF created: {output_path}")
