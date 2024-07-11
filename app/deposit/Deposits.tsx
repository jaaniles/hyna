import { Link, useNavigation } from "@remix-run/react";
import { DepositItem } from "./deposit";
import stylex from "@stylexjs/stylex";
import { Text } from "~/ui/typography/Text";
import { colors } from "~/tokens.stylex";
import { Stack } from "~/ui/Stack";

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

      <Stack spacing={8}>
        {deposits.map((deposit: DepositItem) => {
          return (
            <Link
              key={deposit.depositId}
              to={`/deposit/${deposit.depositId}/edit`}
            >
              <div {...stylex.props(styles.deposit)}>
                <Text>{deposit.date}</Text>
                <Text>$ {deposit.amount}</Text>
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
