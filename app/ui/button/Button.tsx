import stylex from "@stylexjs/stylex";
import { border, borderRadius, colors, spacing } from "~/tokens.stylex";

import { Text } from "~/ui/typography/Text";

type Props = {
  text: string;
  type: "button" | "submit";
  name?: string;
  value?: string;
  variant?: "primary" | "secondary";
  align?: "start" | "center" | "end";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  text,
  type = "button",
  name,
  value,
  variant = "primary",
  align = "start",
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      name={name}
      type={type}
      value={value}
      {...stylex.props(styles.root, variantStyles[variant], alignStyles[align])}
      aria-disabled={disabled}
      onClick={onClick}
    >
      <Text>{text}</Text>
    </button>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    position: "relative",

    height: 32,

    justifyContent: "center",
    alignItems: "center",
    minWidth: "64px",
    border: border.button,
    borderRadius: borderRadius.button,
    paddingLeft: spacing._24,
    paddingRight: spacing._24,
    cursor: { default: "initial", ":hover": "pointer" },
  },
  hidden: {
    opacity: 0,
  },
});

const variantStyles = stylex.create({
  primary: {
    color: colors.red2,
    border: border.button,
    background: {
      default: colors.red9,
      ":hover": colors.red9,
      ":active": colors.red11,
    },
    borderColor: {
      default: colors.red9,
      ":hover": colors.red8,
      ":active": colors.red11,
    },
  },
  secondary: {
    background: "none",
    border: border.button,
    color: {
      default: colors.slate12,
      ":hover": colors.slate11,
      ":active": colors.slate10,
    },
    borderColor: {
      default: colors.slate6,
      ":hover": colors.slate7,
      ":active": colors.slate8,
    },
  },
});

const alignStyles = stylex.create({
  start: {
    alignSelf: "start",
  },
  center: {
    alignSelf: "center",
  },
  end: {
    alignSelf: "end",
  },
});
