import { Link, useNavigation } from "@remix-run/react";
import stylex from "@stylexjs/stylex";
import { DateTime } from "luxon";

import { Text } from "~/ui/typography/Text";
import { colors } from "~/tokens.stylex";
import { Stack } from "~/ui/Stack";
import { DepositItem } from "~/deposit/deposit";

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

      <Stack spacing={8} style={styles.root}>
        {deposits.map((deposit: DepositItem) => {
          const d = DateTime.fromISO(deposit.date);

          return (
            <Link
              key={deposit.depositId}
              to={`/deposit/${deposit.depositId}/edit`}
            >
              <div {...stylex.props(styles.deposit)}>
                <Stack direction="horizontal" spacing={8}>
                  <Stack direction="horizontal" spacing={16}>
                    <Text>
                      {d.toLocaleString({
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </Text>
                  </Stack>
                  <Text>$ {deposit.amount}</Text>
                </Stack>
              </div>
            </Link>
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
  link: {
    width: "100%",
  },
  deposit: {
    display: "flex",
    flexDirection: "column",

    background: colors.slate2,
    padding: 24,
  },
  skeleton: {
    height: 100,
    width: "100%",
  },
});
