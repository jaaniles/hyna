import {
  LoaderFunction,
  ActionFunctionArgs,
  defer,
  redirect,
} from "@remix-run/node";
import { Await, Link, useLoaderData, useNavigate } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";

import { createDeposit, DepositItem, getDeposits } from "~/deposit/deposit";
import { DepositForm } from "~/deposit/DepositForm";
import { Deposits } from "~/deposit/Deposits";
import { Suspense, useEffect } from "react";
import { getUserSession } from "~/session.server";
import { getUserById, User } from "~/auth/auth";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const amount = formData.get("amount");
  const isToday = formData.get("today");
  const date = isToday
    ? new Date().toISOString().split("T")[0]
    : formData.get("date");

  return await createDeposit({
    request,
    amount: Number(amount),
    date: date as string,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  const userProfile = getUserById({ request, uid: sessionUser.uid });
  const deposits = getDeposits(request);

  return defer({
    deposits,
    userProfile,
  });
};

export default function Index() {
  const { deposits, userProfile } = useLoaderData<typeof loader>();

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
        <Await resolve={userProfile}>
          {(userProfile: User) => <RequireProfile userProfile={userProfile} />}
        </Await>
      </Suspense>
    </div>
  );
}

const RequireProfile = ({ userProfile }: { userProfile: User }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile) {
      navigate("/register");
    }
  }, [userProfile, navigate]);

  return null;
};

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
