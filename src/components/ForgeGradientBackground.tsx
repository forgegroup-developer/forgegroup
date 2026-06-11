import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ForgeGradientBackgroundProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function ForgeGradientBackground<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: ForgeGradientBackgroundProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={`forge-gradient-bg relative overflow-hidden ${className}`.trim()} {...props}>
      <div className="forge-gradient-radial pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="forge-gradient-layer forge-gradient-layer-1 pointer-events-none absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-80 blur-[50px]"
        aria-hidden
      />
      <div
        className="forge-gradient-layer forge-gradient-layer-2 pointer-events-none absolute top-1/2 left-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-60 blur-[50px]"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
