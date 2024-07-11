import { Link } from "@remix-run/react";
import { Stack } from "./Stack";
import { Headline } from "./typography/Headline";
import { Text } from "./typography/Text";
import { CreditCard } from "./CreditCard";
import { User } from "~/auth/auth";
import { motion } from "framer-motion";
import stylex from "@stylexjs/stylex";

type Props = {
  user: User;
};

export function Current({ user }: Props) {
  if (!user) {
    return null;
  }

  return (
    <motion.div layout {...stylex.props(styles.root)}>
      <CreditCard user={user} vertical />
      <motion.div layout>
        <Stack spacing={8}>
          <Headline as="h3">$ 5,600</Headline>
          <Text>11.7.2024</Text>

          <Stack spacing={8}>
            <Link to="/">Make deposit</Link>
            <Link to="/profile">Add savings account</Link>
          </Stack>
        </Stack>
      </motion.div>
    </motion.div>
  );
}

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
  },
});
