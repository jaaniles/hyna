import {
  LoaderFunction,
  ActionFunctionArgs,
  redirect,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { createDeposit, getDeposits } from "~/deposit/deposit";
import { DepositForm } from "~/deposit/DepositForm";
import { getUserSession } from "~/session.server";
import { getUserById } from "~/auth/auth";
import { Current } from "~/ui/Current";
import { Page } from "~/ui/Page";
import { Navigation } from "~/ui/navigation/Navigation";
import { Stack } from "~/ui/Stack";
import { Deposits } from "~/deposit/Deposits";

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
  const deposits = await getDeposits(request);

  return json({
    deposits,
    userProfile,
  });
};

export default function Index() {
  const { deposits, userProfile } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Stack spacing={16}>
        <Navigation />

        <Current user={userProfile} deposits={deposits} />

        <DepositForm />

        <Deposits deposits={deposits} />
      </Stack>
    </Page>
  );
}
