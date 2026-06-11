import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

/** Beam rotante solid: nero → corallo → nero */
export const FORGE_BEAM_SOLID: [string, string, string] = ["#111111", "#c8502a", "#111111"];

/** Beam rotante glass: bianco → corallo → pesca */
export const FORGE_BEAM_GLASS: [string, string, string] = ["#ffffff", "#c8502a", "#e8b9a5"];

/** @deprecated Usare FORGE_BEAM_SOLID o FORGE_BEAM_GLASS */
export const FORGE_BEAM = FORGE_BEAM_SOLID;

type SharedProps = {
  children: ReactNode;
  className?: string;
  gradientColors?: [string, string, string];
  variant?: "glass" | "solid";
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
};

type LinkVariant = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className"> & {
    href: string;
  };

type ButtonVariant = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

function beamGradient(colors: [string, string, string], glass = false) {
  if (glass) {
    return `conic-gradient(from var(--gradient-angle), transparent 0%, ${colors[0]} 32%, ${colors[1]} 48%, ${colors[2]} 62%, transparent 74%, transparent 100%)`;
  }
  return `conic-gradient(from var(--gradient-angle), transparent 0%, ${colors[0]} 36%, ${colors[1]} 50%, ${colors[2]} 64%, transparent 76%, transparent 100%)`;
}

function resolveBeamColors(
  variant: "glass" | "solid",
  gradientColors?: [string, string, string]
) {
  if (gradientColors) return gradientColors;
  return variant === "glass" ? FORGE_BEAM_GLASS : FORGE_BEAM_SOLID;
}

function LightBeamShell({
  children,
  className = "",
  gradientColors,
  variant = "solid",
  size = "default",
  style,
  ...rest
}: SharedProps & { style?: CSSProperties } & Record<string, unknown>) {
  const sizeClass =
    size === "lg" ? "light-beam-btn--lg" : size === "sm" ? "light-beam-btn--sm" : "";
  const variantClass = variant === "glass" ? "light-beam-btn--glass" : "light-beam-btn--solid";
  const beamColors = resolveBeamColors(variant, gradientColors);
  const isGlass = variant === "glass";

  return (
    <span
      className={`light-beam-btn group ${variantClass} ${sizeClass} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <span
        className="light-beam-btn__beam"
        style={{ background: beamGradient(beamColors, isGlass) }}
        aria-hidden
      />
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
  gradientColors,
  variant = "solid",
  size = "default",
  fullWidth = false,
  href,
  disabled,
  ...rest
}: (LinkVariant | ButtonVariant) & { disabled?: boolean }) {
  const shell = (
    <LightBeamShell
      gradientColors={gradientColors}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </LightBeamShell>
  );

  if (href) {
    const {
      type: _type,
      disabled: _disabled,
      href: _href,
      ...linkRest
    } = rest as LinkVariant & {
      type?: string;
      disabled?: boolean;
      href?: string;
    };

    return (
      <Link
        href={href}
        className={fullWidth ? "inline-flex w-full max-w-full shrink-0" : "inline-flex shrink-0"}
        {...linkRest}
      >
        {shell}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex shrink-0 border-0 bg-transparent p-0 disabled:cursor-not-allowed${fullWidth ? " w-full" : ""}`}
      {...buttonRest}
    >
      {shell}
    </button>
  );
}
