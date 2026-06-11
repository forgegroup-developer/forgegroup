import Link from "next/link";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

const FORGE_BEAM: [string, string, string] = ["#ffffff", "#c8502a", "#e8b9a5"];

type SharedProps = {
  children: ReactNode;
  className?: string;
  gradientColors?: [string, string, string];
  variant?: "glass" | "solid";
  size?: "default" | "lg";
};

type LinkVariant = SharedProps & {
  href: string;
};

type ButtonVariant = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

function beamGradient(colors: [string, string, string]) {
  return `conic-gradient(from var(--gradient-angle), transparent 0%, ${colors[0]} 32%, ${colors[1]} 48%, ${colors[2]} 62%, transparent 74%, transparent 100%)`;
}

function LightBeamShell({
  children,
  className = "",
  gradientColors = FORGE_BEAM,
  variant = "glass",
  size = "default",
  style,
  ...rest
}: SharedProps & { style?: CSSProperties } & Record<string, unknown>) {
  const sizeClass = size === "lg" ? "light-beam-btn--lg" : "";
  const variantClass = variant === "solid" ? "light-beam-btn--solid" : "light-beam-btn--glass";

  return (
    <span
      className={`light-beam-btn group ${variantClass} ${sizeClass} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <span className="light-beam-btn__beam" style={{ background: beamGradient(gradientColors) }} aria-hidden />
      <span className="light-beam-btn__glow" aria-hidden />
      <span className="light-beam-btn__inner" aria-hidden />
      <span className="light-beam-btn__shine" aria-hidden />
      <span className="light-beam-btn__label">{children}</span>
    </span>
  );
}

export default function LightBeamButton({
  children,
  className = "",
  gradientColors = FORGE_BEAM,
  variant = "glass",
  size = "default",
  href,
  ...rest
}: LinkVariant | ButtonVariant) {
  if (href) {
    return (
      <Link href={href} className="inline-flex w-full max-w-full shrink-0">
        <LightBeamShell
          gradientColors={gradientColors}
          variant={variant}
          size={size}
          className={className}
        >
          {children}
        </LightBeamShell>
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={type} className="inline-flex shrink-0 border-0 bg-transparent p-0" {...buttonRest}>
      <LightBeamShell
        gradientColors={gradientColors}
        variant={variant}
        size={size}
        className={className}
      >
        {children}
      </LightBeamShell>
    </button>
  );
}
