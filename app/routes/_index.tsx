import { LoaderFunction, ActionFunctionArgs, defer } from "@remix-run/node";
import { Await, json, Link, useLoaderData } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";

import { createDeposit, DepositItem, getDeposits } from "~/deposit/deposit";
import { requireUserSession } from "~/session.server";
import { DepositForm } from "~/deposit/DepositForm";
import { Deposits } from "~/deposit/Deposits";
import { Suspense } from "react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

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

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);
  const deposits = await getDeposits(request);

  return defer({
    deposits,
  });
};

export default function Index() {
  const { deposits } = useLoaderData<typeof loader>();

  return (
    <div {...stylex.props(styles.root)}>
      <h1>Entry</h1>

      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>

      <DepositForm />

      <Suspense fallback={<Skeleton />}>
        <Await resolve={deposits}>
          {(deposits) => <Deposits deposits={deposits as DepositItem[]} />}
        </Await>
      </Suspense>
    </div>
  );
}

const Skeleton = () => {
  return <div>Loading...</div>;
};

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 64,
  },
});
