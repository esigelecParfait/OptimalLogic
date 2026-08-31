import "server-only";

import { z } from "zod";
import { PUBLIC_OFFER_CODES } from "@/lib/offers/public-catalog";

const databasePriceSchema = z.union([z.number(), z.string()]).nullable();

export const publicDatabaseOffersSchema = z.array(
  z.object({
    code: z.enum(PUBLIC_OFFER_CODES),
    nom_offre: z.string().trim().min(1),
    client_type: z.string().trim().min(1),
    prix: databasePriceSchema,
    prix_abonnement: databasePriceSchema,
    is_active: z.literal(true),
    created_at: z.string().nullable().optional(),
  }),
);
