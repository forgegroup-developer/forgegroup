import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

/** Beam rotante unificato: bianco → corallo → bianco (tutti i pulsanti) */
export const FORGE_BEAM: [string, string, string] = ["#ffffff", "#d95830", "#ffffff"];

/** @deprecated Alias di FORGE_BEAM */
export const FORGE_BEAM_GLASS = FORGE_BEAM;
export const FORGE_BEAM_SOLID = FORGE_BEAM;

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

function beamGradient(colors: [string, string, string]) {
  return `conic-gradient(from var(--gradient-angle), transparent 0%, ${colors[0]} 28%, ${colors[1]} 46%, ${colors[2]} 64%, transparent 78%, transparent 100%)`;
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
  const beamColors = gradientColors ?? FORGE_BEAM;

  return (
    <span
      className={`light-beam-btn group ${variantClass} ${sizeClass} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <span
        className="light-beam-btn__beam"
        style={{ background: beamGradient(beamColors) }}
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
