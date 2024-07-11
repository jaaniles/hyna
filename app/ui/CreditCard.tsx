import stylex from "@stylexjs/stylex";
import { motion } from "framer-motion";
import { useState } from "react";
import { User } from "~/auth/auth";
import { spacing } from "~/tokens.stylex";

type Props = {
  user?: User;
  vertical?: boolean;
};

const CARD_HEIGHT = 190;

export function CreditCard({ user, vertical }: Props) {
  const [inspect, setInspect] = useState(false);

  const handleInspect = () => {
    if (vertical) {
      setInspect(!inspect);
    }
  };

  const animate = inspect ? "inspect" : vertical ? "vertical" : "horizontal";

  return (
    <motion.div
      onClick={handleInspect}
      layoutId="credit-card"
      initial={vertical ? "vertical" : "horizontal"}
      whileHover={vertical ? "hover" : undefined}
      animate={animate}
      variants={{
        horizontal: {
          scale: 1,
          x: 0,
          rotate: 0,
        },
        vertical: {
          scale: 1,
          rotate: 90,
          x: -CARD_HEIGHT * 1.55,
        },
        inspect: {
          scale: 1,
          rotate: 7,
          x: -CARD_HEIGHT / 2.25,
        },
        hover: {
          y: -5,
        },
      }}
      {...stylex.props(
        styles.root,
        inspect && styles.inspect,
        styles[vertical ? "vertical" : "horizontal"]
      )}
    >
      <div>
        <p {...stylex.props(styles.text)}>TRACK YOUR SAVINGS</p>
      </div>
      <div>
        <p {...stylex.props(styles.text, styles.alignRight)}>
          {user?.username ? user.username : "HYNA CORP"}
        </p>
      </div>
    </motion.div>
  );
}

const MOBILE = "@media (max-width: 619px)";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    transformOrigin: "center center",

    width: 325,
    height: CARD_HEIGHT,

    backgroundImage:
      "linear-gradient(to left top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8b96d6, #7e91cb, #728cbf, #6378a2, #546486, #45516b, #373f51)",

    padding: `${spacing._16} ${spacing._24}`,

    borderRadius: 32,
  },
  horizontal: {
    width: {
      default: 325,
      [MOBILE]: 275,
    },
    height: {
      default: CARD_HEIGHT,
      [MOBILE]: 145,
    },
  },
  vertical: {
    width: 325,
    height: CARD_HEIGHT,
    position: "absolute",
  },
  alignRight: {
    textAlign: "right",
  },
  inspect: {
    position: "absolute",
  },
  text: {
    userSelect: "none",
    fontWeight: 500,
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
});
