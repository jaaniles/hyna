import * as ToastPrimitive from "@radix-ui/react-toast";
import stylex from "@stylexjs/stylex";
import { colors, spacing } from "~/tokens.stylex";
import { Button } from "~/ui/button/Button";
import { Stack } from "~/ui/Stack";

type Props = {
  title?: string;
  description: string;
};

export function Toast({ title, description }: Props) {
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root {...stylex.props(styles.root)}>
        <Stack
          direction="horizontal"
          spacing={8}
          style={styles.content}
          alignVertical="center"
        >
          <Stack spacing={8}>
            {title && <ToastPrimitive.Title>{title}</ToastPrimitive.Title>}
            <ToastPrimitive.Description>
              {description}
            </ToastPrimitive.Description>
          </Stack>

          <Stack spacing={8} align="center" alignVertical="center">
            <ToastPrimitive.Action asChild altText="Close toast">
              <Button type="button" text="Close" variant="secondary" />
            </ToastPrimitive.Action>
          </Stack>
        </Stack>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport {...stylex.props(styles.viewport)} />
    </ToastPrimitive.Provider>
  );
}

const styles = stylex.create({
  root: {
    borderRadius: 8,
    padding: spacing._16,
    background: colors.slate3,
  },
  content: {
    justifyContent: "space-between",
  },
  viewport: {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",

    color: colors.slate12,

    padding: spacing._24,
    gap: spacing._16,

    width: 400,
    maxWidth: "100vw",

    margin: 0,
    listStyle: "none",
    zIndex: 1000,
    outline: "none",
  },
});
