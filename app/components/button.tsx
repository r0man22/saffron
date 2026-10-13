import { Arrow } from "./icons";

export function RollText({ children }: { children: React.ReactNode }) {
  return <span className="roll-text"><span>{children}</span></span>;
}
export function LinkArrow() {
  return <span className="link-arrow" aria-hidden="true"><Arrow /><Arrow /></span>;
}
export function ButtonInner({ children, icon = true }: { children: React.ReactNode; icon?: boolean }) {
  return <><RollText>{children}</RollText>{icon && <span className="button-icon" aria-hidden="true"><Arrow /><Arrow /></span>}</>;
}
