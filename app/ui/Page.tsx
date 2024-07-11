import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Page({ children }: Props) {
  return <div {...stylex.props(styles.root)}>{children}</div>;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 64,
  },
});
