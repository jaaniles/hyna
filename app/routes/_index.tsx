import {
  LoaderFunction,
  ActionFunctionArgs,
  defer,
  redirect,
} from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";

import { createDeposit, DepositItem, getDeposits } from "~/deposit/deposit";
import { DepositForm } from "~/deposit/DepositForm";
import { Deposits } from "~/deposit/Deposits";
import { Suspense } from "react";
import { getUserSession } from "~/session.server";
import { getUserById } from "~/auth/auth";
import { Current } from "~/ui/Current";
import { Page } from "~/ui/Page";
import { Navigation } from "~/ui/navigation/Navigation";

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

  const userProfile = await getUserById({ request, uid: sessionUser.uid });
  const deposits = getDeposits(request);

  return defer({
    deposits,
    userProfile,
  });
};

export default function Index() {
  const { deposits, userProfile } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Navigation />

      <Current user={userProfile} />

      <DepositForm />

      <Suspense fallback={<Skeleton />}>
        <Await resolve={deposits}>
          {(deposits) => <Deposits deposits={deposits as DepositItem[]} />}
        </Await>
      </Suspense>
    </Page>
  );
}

const Skeleton = () => {
  return <div>Loading...</div>;
};
