import { MediaFrame } from "../../primitives";
import type { BlockMedia } from "../types";

import styles from "./shared.module.css";

type BlockMediaFrameProps = {
  media: BlockMedia;
  defaultRatio?: "landscape" | "portrait" | "square" | "wide";
};

// Cet adaptateur conserve MediaFrame générique et ajoute un placeholder interne.
export function BlockMediaFrame({
  media,
  defaultRatio = "landscape",
}: BlockMediaFrameProps) {
  return (
    <MediaFrame fit={media.fit ?? "cover"} ratio={media.ratio ?? defaultRatio}>
      {media.content ?? (
        <span className={styles.mediaPlaceholder}>
          {media.label ?? "Média autorisé à fournir"}
        </span>
      )}
    </MediaFrame>
  );
}
