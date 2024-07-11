import stylex from "@stylexjs/stylex";
import { motion } from "framer-motion";
import { User } from "~/auth/auth";
import { colors, spacing } from "~/tokens.stylex";

type Props = {
  user?: User;
  vertical?: boolean;
};

const CARD_HEIGHT = 190;

export function CreditCard({ user, vertical }: Props) {
  return (
    <motion.div
      layoutId="credit-card"
      initial="horizontal"
      animate={vertical ? "vertical" : "horizontal"}
      variants={{
        horizontal: {
          x: 0,
          rotate: 0,
        },
        vertical: {
          rotate: 90,
          x: -CARD_HEIGHT * 1.75,
        },
      }}
      {...stylex.props(
        styles.root,
        vertical ? styles.vertical : styles.horizontal
      )}
    >
      <div>
        <p {...stylex.props(styles.text)}>SAVINGS</p>
      </div>
      {user && (
        <div>
          <p {...stylex.props(styles.text, styles.alignRight)}>
            {user?.username}
          </p>
        </div>
      )}
    </motion.div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    transformOrigin: "center center",

    width: 325,
    height: CARD_HEIGHT,

    background: colors.red8,

    padding: `${spacing._16} ${spacing._24}`,

    borderRadius: 32,

    boxShadow: `0px 0px 18px 0px rgba(88,53,59,0.8)`,
  },
  horizontal: {
    width: 400,
    height: CARD_HEIGHT + 35,
  },
  vertical: {
    width: 325,
    height: CARD_HEIGHT,
    position: "absolute",
  },
  alignRight: {
    textAlign: "right",
  },
  text: {
    fontWeight: 500,
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
});
