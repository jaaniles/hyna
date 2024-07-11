import stylex from "@stylexjs/stylex";
import {
  border,
  borderRadius,
  colors,
  fontSize,
  spacing,
} from "~/tokens.stylex";

type Props = {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "date" | "hidden";
  defaultValue?: string | number | undefined;
  placeholder?: string | undefined;
  hasError?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  id,
  name,
  type = "text",
  defaultValue,
  placeholder,
  hasError,
  onChange,
}: Props) {
  const state = hasError ? "error" : "default";

  return (
    <input
      id={id}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      {...stylex.props(styles.root, stateStyles[state])}
    />
  );
}

const styles = stylex.create({
  root: {
    width: "100%",
    height: 32,
    fontSize: fontSize.input,
    padding: spacing._8,
    borderRadius: borderRadius.input,

    color: colors.gray12,
    background: "none",
    border: {
      default: border.input,
      ":focus": border.transparent,
    },

    outline: {
      default: "none",
      ":hover": border.inputHover,
      ":focus": border.inputFocus,
    },

    "::placeholder": {
      color: colors.gray5,
    },

    "-moz-appearance": "textfield",
  },
});

const stateStyles = stylex.create({
  default: {},
  error: {
    borderColor: colors.red5,
  },
});
