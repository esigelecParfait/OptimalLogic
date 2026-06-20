import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";
import { getClientConfig } from "@/lib/clients/registry";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SESSION_LIMIT = 20;

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/chat/[clientId]">
) {
  const ip = getClientIp(request);
  const rl = rateLimit(`chat-client:${ip}`, 10, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { clientId } = await ctx.params;
  const config = getClientConfig(clientId);
  if (!config) {
    return Response.json({ error: "Client introuvable." }, { status: 404 });
  }

  let body: { messages?: unknown[]; sessionCount?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (typeof body.sessionCount === "number" && body.sessionCount >= SESSION_LIMIT) {
    return Response.json({ error: "Limite de session atteinte." }, { status: 429 });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
  const messages = rawMessages.filter(
    (m): m is { role: "user" | "assistant"; content: string } =>
      typeof m === "object" &&
      m !== null &&
      typeof (m as Record<string, unknown>).content === "string" &&
      ((m as Record<string, unknown>).role === "user" || (m as Record<string, unknown>).role === "assistant")
  );

  if (messages.length === 0) {
    return Response.json({ error: "Aucun message." }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          system: config.systemPrompt,
          messages: messages as Anthropic.MessageParam[],
          stream: true,
        });

        for await (const event of response) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
            );
          }
        }
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        controller.close();
      } catch {
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify({ error: "Erreur de génération." })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
