import { Link } from "@remix-run/react";
import { DepositItem } from "./deposit";
import stylex from "@stylexjs/stylex";

type Props = {
  deposits: DepositItem[];
};

export const Deposits = ({ deposits }: Props) => {
  return (
    <div>
      {deposits.map((deposit: DepositItem) => {
        return (
          <div key={deposit.depositId} {...stylex.props(styles.deposit)}>
            <Link to={`/deposit/${deposit.depositId}/edit`}>
              {deposit.depositId}
            </Link>
            <p>Amount: {deposit.amount}</p>
            <p>Date: {deposit.date}</p>
          </div>
        );
      })}
    </div>
  );
};

const styles = stylex.create({
  deposit: {
    padding: 24,
  },
});
