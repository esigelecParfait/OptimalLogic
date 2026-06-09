type BrevoRecipient = {
  email: string;
  name?: string;
};

type SendBrevoEmailParams = {
  to: BrevoRecipient[];
  subject: string;
  htmlContent: string;
  replyTo?: BrevoRecipient;
};

export async function sendBrevoEmail({
  to,
  subject,
  htmlContent,
  replyTo,
}: SendBrevoEmailParams) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderName = process.env.BREVO_SENDER_NAME;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY est manquante.");
  }

  if (!senderName || !senderEmail) {
    throw new Error("BREVO_SENDER_NAME ou BREVO_SENDER_EMAIL est manquant.");
  }

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
      ...(replyTo ? { replyTo } : {}),
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Erreur Brevo: ${response.status} ${response.statusText}`
    );
  }

  return data as {
    messageId?: string;
  };
}