import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";
import { spacing } from "~/tokens.stylex";

type Props = {
  children: ReactNode;
  sidespace?: boolean;
};

export function Page({ sidespace, children }: Props) {
  return (
    <div {...stylex.props(styles.root, sidespace && styles.sidespace)}>
      {children}
    </div>
  );
}

const MOBILE = "@media (max-width: 619px)";
const TABLET = "@media (max-width: 904px)";
const DESKTOP = "@media (max-width: 1239px)";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    padding: spacing._32,
  },
  sidespace: {
    padding: {
      default: `${spacing._32} ${spacing._98}`,
      [MOBILE]: `${spacing._32} ${spacing._72}`,
      [TABLET]: `${spacing._32} ${spacing._72}`,
      [DESKTOP]: `${spacing._32} ${spacing._98}`,
    },
  },
});
