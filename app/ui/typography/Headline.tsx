import * as stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

import { colors, fontSize } from "~/tokens.stylex";

export type Props = {
  children: ReactNode;
  as: "h1" | "h2" | "h3" | "h4" | "span";
  size?: "sm" | "md" | "lg";
  color?: "white" | "black" | "primary" | "disabled";
  align?: "left" | "center" | "right";
};

export function Headline({
  children,
  as,
  size = "lg",
  color = "white",
  align = "left",
}: Props) {
  const Component = as;

  return (
    <Component
      {...stylex.props(
        styles.root,
        fontSizeStyles[size],
        colorStyles[color],
        textAlignStyles[align]
      )}
    >
      {children}
    </Component>
  );
}

const styles = stylex.create({
  root: {
    lineHeight: 1.2,
    letterSpacing: "1%",
    margin: 0,
  },
});

const fontSizeStyles = stylex.create({
  sm: {
    fontSize: fontSize.headlineSmall,
  },
  md: {
    fontSize: fontSize.headlineMedium,
  },
  lg: {
    fontSize: fontSize.headlineLarge,
  },
});

const colorStyles = stylex.create({
  white: {
    color: colors.white,
  },
  black: {
    color: colors.black,
  },
  primary: {
    color: colors.red10,
  },
  disabled: {
    color: colors.gray5,
  },
});

const textAlignStyles = stylex.create({
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
});
