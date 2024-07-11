import { Link } from "@remix-run/react";
import { Stack } from "./Stack";
import { Headline } from "./typography/Headline";
import { Text } from "./typography/Text";
import { CreditCard } from "./CreditCard";
import { User } from "~/auth/auth";
import { motion } from "framer-motion";
import stylex from "@stylexjs/stylex";
import { DepositItem } from "~/deposit/deposit";

type Props = {
  user?: User;
  deposits?: DepositItem[];
};

export function Current({ user, deposits = [] }: Props) {
  if (!user) {
    return null;
  }

  const current = deposits.length > 0 && deposits[0];

  return (
    <motion.div layout {...stylex.props(styles.root)}>
      <CreditCard user={user} vertical />
      <motion.div layout>
        <Stack spacing={8}>
          {current && <Headline as="h3">$ {current.amount}</Headline>}
          {current && <Text>{current.date}</Text>}

          <Stack spacing={8}>
            <Link to="/deposit">Create deposit</Link>
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
  },
});
