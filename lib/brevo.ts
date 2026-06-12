type BrevoRecipient = {
  email: string;
  name?: string;
};

type SendBrevoEmailParams = {
  to: BrevoRecipient[];
  subject: string;
  htmlContent: string;
  textContent?: string;
};

export type BrevoSendResult = {
  success: boolean;
  messageId: string | null;
  error: string | null;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} est manquant dans les variables d’environnement.`);
  }

  return value;
}

export async function sendBrevoEmail({
  to,
  subject,
  htmlContent,
  textContent,
}: SendBrevoEmailParams): Promise<BrevoSendResult> {
  try {
    const apiKey = getRequiredEnv("BREVO_API_KEY");
    const senderName = getRequiredEnv("BREVO_SENDER_NAME");
    const senderEmail = getRequiredEnv("BREVO_SENDER_EMAIL");

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to,
        subject,
        htmlContent,
        textContent,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Erreur Brevo :", data);

      return {
        success: false,
        messageId: null,
        error:
          data?.message ||
          data?.error ||
          "Erreur lors de l’envoi de l’email Brevo.",
      };
    }

    return {
      success: true,
      messageId: data?.messageId || null,
      error: null,
    };
  } catch (error) {
    console.error("Erreur sendBrevoEmail :", error);

    return {
      success: false,
      messageId: null,
      error:
        error instanceof Error
          ? error.message
          : "Erreur inconnue lors de l’envoi de l’email.",
    };
  }
}