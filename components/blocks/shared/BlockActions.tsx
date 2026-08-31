import { Button, Cluster } from "../../primitives";
import type { BlockAction } from "../types";

import styles from "./shared.module.css";

type BlockActionsProps = {
  primary?: BlockAction;
  secondary?: BlockAction;
  align?: "start" | "center";
};

// BlockActions renvoie zéro, un ou deux appels à l'action accessibles.
export function BlockActions({ primary, secondary, align = "start" }: BlockActionsProps) {
  // Sans action, le composant ne laisse aucune div inutile dans la page.
  if (!primary && !secondary) {
    return null;
  }

  return (
    <Cluster
      className={align === "center" ? styles.actionsCenter : undefined}
      gap="medium"
    >
      {primary && (
        <Button href={primary.href} variant={primary.variant ?? "primary"}>
          {primary.label}
        </Button>
      )}

      {secondary && (
        <Button href={secondary.href} variant={secondary.variant ?? "secondary"}>
          {secondary.label}
        </Button>
      )}
    </Cluster>
  );
}
