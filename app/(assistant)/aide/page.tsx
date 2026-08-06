import type { Metadata } from "next";
import AssistantChatPage from "@/components/chat/AssistantChatPage";

export const metadata: Metadata = {
  title: "Aide — Assistant OptimalLogic",
  description:
    "Échangez avec l’assistant OptimalLogic pour trouver l’offre ou la ressource adaptée à votre besoin.",
};

export default function HelpPage() {
  return <AssistantChatPage />;
}
