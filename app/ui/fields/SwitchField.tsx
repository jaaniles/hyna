import * as Switch from "@radix-ui/react-switch";
import stylex from "@stylexjs/stylex";
import { colors } from "~/tokens.stylex";

import { Stack } from "~/ui/Stack";

type Props = {
  id: string;
  name: string;
  label: string;
  value?: string;
  defaultValue?: boolean;
  placeholder?: string | undefined;
  error?: string | undefined;
  onChange?: (checked: boolean) => void;
};

export function SwitchField({
  id,
  name,
  label,
  defaultValue,
  value,
  onChange,
}: Props) {
  return (
    <Stack spacing={4}>
      <label htmlFor={id}>{label}</label>

      <Switch.Root
        id={id}
        defaultChecked={defaultValue}
        onCheckedChange={onChange}
        name={name}
        value={value}
        {...stylex.props(styles.switchRoot)}
      >
        <Switch.Thumb {...stylex.props(styles.thumb)} />
      </Switch.Root>
    </Stack>
  );
}

const styles = stylex.create({
  switch: {
    display: "flex",
    alignItems: "center",
  },
  switchRoot: {
    width: 46,
    height: 25,
    position: "relative",
    borderRadius: 99999,

    background: {
      default: colors.gray4,
      ":is([data-state='checked'])": colors.red8,
    },
    border: "none",
    outline: "none",

    transition: "all 300ms ease-in-out",
    willChange: "background",
  },
  thumb: {
    display: "block",
    width: 21,
    height: 21,

    background: {
      default: colors.gray12,
      ":is([data-state='checked'])": colors.red12,
    },
    borderRadius: 99999,

    transition: "all 300ms ease-in-out",
    willChange: "transform, background",
    transform: {
      default: "translateX(0px)",
      ":is([data-state='checked'])": "translateX(18px)",
    },
  },
});
