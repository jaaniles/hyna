import {
  LoaderFunction,
  MetaFunction,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Form, json, Link, useLoaderData } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";
import * as Switch from "@radix-ui/react-switch";

import {
  deleteDeposit,
  createDeposit,
  DepositItem,
  getDeposits,
} from "~/deposit/deposit";
import { useState } from "react";
import { requireUserSession } from "~/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Hyna" },
    { name: "description", content: "One of the apps of your life!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "create":
      return await createDepositAction(request, formData);
    case "delete":
      return await deleteDepositAction(request, formData);
    default:
      throw new Error("Unexpected action intent");
  }
};

const createDepositAction = async (request: Request, formData: FormData) => {
  const amount = formData.get("amount");
  const isToday = formData.get("today");
  const date = isToday
    ? new Date().toISOString().split("T")[0]
    : formData.get("date");

  await createDeposit({
    request,
    amount: Number(amount),
    date: date as string,
  });

  return json({ message: "Deposit created" });
};

const deleteDepositAction = async (request: Request, formData: FormData) => {
  const depositId = formData.get("depositId");
  await deleteDeposit({ request, depositId: depositId as string });

  return json({ message: "Deposit deleted" });
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);

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

  return (
    <div {...stylex.props(styles.root)}>
      <h1>Entry</h1>

      <Link to="/">Home</Link>
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

          <label htmlFor="today" {...stylex.props(styles.switch)}>
            Today
            <Switch.Root
              id="today"
              defaultChecked={true}
              onCheckedChange={handleCustomDateChange}
              name="today"
              value="today"
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

          <button type="submit" name="intent" value="create">
            Deposit
          </button>
        </Form>
      </div>

      <div>
        {deposits.map((deposit: DepositItem) => {
          return (
            <Form method="post" key={`${deposit.uid}`}>
              <div {...stylex.props(styles.deposit)}>
                <Link to={`/deposit/${deposit.uid}/edit`}>{deposit.uid}</Link>
                <p>Amount: {deposit.amount}</p>
                <p>Date: {deposit.date}</p>
                <input type="hidden" name="depositId" value={deposit.uid} />
                <button type="submit" name="intent" value="delete">
                  delete
                </button>
              </div>
            </Form>
          );
        })}
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
