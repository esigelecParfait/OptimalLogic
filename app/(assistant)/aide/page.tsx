import type { Metadata } from "next";
import AssistantChatPage from "@/components/chat/AssistantChatPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Aide & assistant",
  description:
    "Échangez avec l’assistant OptimalLogic pour trouver l’offre ou la ressource adaptée à votre besoin.",
  path: "/aide",
});

export default function HelpPage() {
  return <AssistantChatPage />;
}
