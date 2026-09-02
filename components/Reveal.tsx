import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "span";
};

/* The design system is explicit: type does not move and headlines do not
   fade in. This wrapper previously shipped every block at opacity 0 and
   revealed it on scroll, which meant the page rendered blank without JS.
   It now renders its children directly. The delay and y props are kept so
   existing call sites continue to compile. */
export default function Reveal({
  children,
  className = "",
  as = "div",
}: Props) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
