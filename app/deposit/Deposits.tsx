import { Link, useNavigation } from "@remix-run/react";
import stylex from "@stylexjs/stylex";
import { DateTime } from "luxon";

import { Text } from "~/ui/typography/Text";
import { Stack } from "~/ui/Stack";
import { DepositItem } from "~/deposit/deposit";
import { Headline } from "~/ui/typography/Headline";

type Props = {
  deposits: DepositItem[];
};

export const Deposits = ({ deposits }: Props) => {
  const navigation = useNavigation();
  const isCreating = navigation.formAction === "/?index";

  return (
    <div {...stylex.props(styles.root)}>
      {isCreating && (
        <div {...stylex.props(styles.deposit)}>
          <Text>Securing deposit</Text>
        </div>
      )}

      <Stack spacing={32} style={styles.root}>
        {deposits.map((deposit: DepositItem) => {
          const d = DateTime.fromISO(deposit.date);

          return (
            <Stack spacing={8} key={deposit.depositId} style={styles.deposit}>
              <Headline as="h3" size="sm">
                {d.toLocaleString({
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Headline>
              <Stack
                direction="horizontal"
                alignVertical="center"
                spacing={8}
                style={styles.spaceBetween}
              >
                <Text size="lg">$ {deposit.amount}</Text>
                <Link to={`/deposit/${deposit.depositId}`}>
                  <Text>EDIT</Text>
                </Link>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
};

export const DepositSkeleton = () => {
  return (
    <div {...stylex.props(styles.deposit, styles.skeleton)}>
      <Text>Loading...</Text>
    </div>
  );
};

const styles = stylex.create({
  root: {
    width: "100%",
  },
  deposit: {},
  spaceBetween: {
    justifyContent: "space-between",
  },
  skeleton: {
    height: 100,
    width: "100%",
  },
});
