import {
  LoaderFunction,
  MetaFunction,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Form, json, Link, useLoaderData } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";
import * as Switch from "@radix-ui/react-switch";

import {
  depositAmount,
  DepositItem,
  getDeposits,
} from "~/deposit/depositRequest";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Hyna" },
    { name: "description", content: "One of the apps of your life!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const amount = formData.get("amount");
  const date = formData.get("date");

  return await depositAmount({
    request,
    amount: Number(amount),
    date: date as string,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const deposits = await getDeposits(request);

  return json({
    deposits,
  });
};

export default function Index() {
  const { deposits } = useLoaderData<typeof loader>();

  const [showCustomDate, setShowCustomDate] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleCustomDateChange = (checked: boolean) => {
    setShowCustomDate(!checked);
  };

  console.log(deposits);

  return (
    <div {...stylex.props(styles.root)}>
      <h1>Entry</h1>

      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>

      <div>
        <h1>Deposit</h1>

        <Form method="post" {...stylex.props(styles.form)}>
          <label htmlFor="amount">
            Amount:
            <input type="number" name="amount" />
          </label>

          <label htmlFor="enableCustomDate" {...stylex.props(styles.switch)}>
            Today
            <Switch.Root
              id="enableCustomDate"
              defaultChecked={true}
              onCheckedChange={handleCustomDateChange}
              {...stylex.props(styles.switchRoot)}
            >
              <Switch.Thumb {...stylex.props(styles.thumb)} />
            </Switch.Root>
          </label>

          <div {...stylex.props(!showCustomDate && styles.hidden)}>
            <label htmlFor="date">
              Date: <input type="date" name="date" defaultValue={today} />
            </label>
          </div>

          <button type="submit">Deposit</button>
        </Form>
      </div>

      <div>
        {deposits.map((deposit: DepositItem) => (
          <div
            key={`${deposit.amount}${deposit.date}`}
            {...stylex.props(styles.deposit)}
          >
            <p>Amount: {deposit.amount}</p>
            <p>Date: {deposit.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 64,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  switch: {
    display: "flex",
    alignItems: "center",
  },
  switchRoot: {
    width: 42,
    height: 25,
    position: "relative",
    borderRadius: 16,
  },
  thumb: {
    display: "block",
    width: 21,
    height: 21,

    marginBottom: 15,

    backgroundColor: "white",
    borderRadius: 16,

    transition: "transform 100ms ease-in-out",
    willChange: "transform",
    transform: {
      default: "translateX(0px)",
      ":is([data-state='checked'])": "translateX(10px)",
    },
  },
  hidden: {
    display: "none",
  },
  deposit: {
    color: "white",
    background: "black",
    padding: 24,
  },
});
