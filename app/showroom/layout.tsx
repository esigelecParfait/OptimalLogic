import type { ReactNode } from "react";

// The reusable system tokens are scoped to the internal showroom until the
// marketing pages are migrated to the V2 design system.
import "../../styles/tokens.generated.css";

export default function ShowroomLayout({ children }: { children: ReactNode }) {
  return children;
}
