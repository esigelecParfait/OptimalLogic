import { LEON_CLIENT_ID, LEON_SYSTEM_PROMPT } from "./leon-config";

type ClientEntry = {
  systemPrompt: string;
  commerceName: string;
  active: boolean;
};

export const CLIENT_REGISTRY: Record<string, ClientEntry> = {
  [LEON_CLIENT_ID]: {
    systemPrompt: LEON_SYSTEM_PROMPT,
    commerceName: "Les Délices de Léon",
    active: true,
  },
};

export function getClientConfig(clientId: string): ClientEntry | null {
  const entry = CLIENT_REGISTRY[clientId];
  if (!entry || !entry.active) return null;
  return entry;
}
