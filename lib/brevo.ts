type EmailRecipient = {
  email: string;
  name?: string;
};

type SendEmailParams = {
  to: EmailRecipient[];
  subject: string;
  htmlContent: string;
  textContent?: string;
};

export type BrevoSendResult = {
  success: boolean;
  messageId: string | null;
  error: string | null;
};

export async function sendBrevoEmail({
  to,
  subject,
  htmlContent,
  textContent,
}: SendEmailParams): Promise<BrevoSendResult> {
  void to;
  void subject;
  void htmlContent;
  void textContent;

  return {
    success: true,
    messageId: null,
    error: null,
  };
}
