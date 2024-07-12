import stylex from "@stylexjs/stylex";
import { motion } from "framer-motion";
import { useState } from "react";
import { User } from "~/auth/auth";
import { colors, spacing } from "~/tokens.stylex";

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
        <p {...stylex.props(styles.text)}>HYNA Basic</p>
      </div>
      <div>
        <p {...stylex.props(styles.text, styles.print)}>000 1234 000 1234</p>
        <p {...stylex.props(styles.text, styles.print)}>{user?.username}</p>
      </div>
      <div>
        <p
          {...stylex.props(styles.text, styles.alignRight, styles.hynaTextLogo)}
        >{`HYNA CORP™`}</p>
      </div>
      <div {...stylex.props(styles.decoration)} />
    </motion.div>
  );
}

const MOBILE = "@media (max-width: 619px)";

const styles = stylex.create({
  root: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    transformOrigin: "center center",

    width: 325,
    height: CARD_HEIGHT,

    backgroundImage:
      "linear-gradient(to right top, #4b4453, #684663, #8d4463, #ae4254, #c34a36)",
    padding: `${spacing._16} ${spacing._8} ${spacing._8} ${spacing._24}`,
    border: `1px solid ${colors.slate4}`,

    borderRadius: 16,
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
    fontWeight: 600,
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.25em",
  },
  print: {
    textShadow:
      "1px 1px 0px rgba(255, 255, 0, 0.3), 0 0 0 #000, 1px 2px 3px #000",
  },
  hynaTextLogo: {
    transform: "skew(-15deg)",
  },
  decoration: {
    borderTopLeftRadius: "45%",
    borderBottomRightRadius: 16,

    position: "absolute",
    bottom: 0,
    right: 0,
    content: "''",
    width: 125,
    height: 75,
    filter: "blur(2px)",
    background: "rgba(255, 150, 150,0.11)",
  },
});
