import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import stylex from "@stylexjs/stylex";

import { DepositItem } from "~/deposit/deposit";
import { User } from "~/auth/auth";
import { CreditCard } from "~/ui/CreditCard";
import { Stack } from "~/ui/Stack";
import { Headline } from "~/ui/typography/Headline";
import { Text } from "~/ui/typography/Text";

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
          <Headline as="h1" size="md">
            Current balance
          </Headline>
          {current && <Text size="lg">$ {current.amount}</Text>}

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
