import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/auth/auth";
import { createDeposit } from "~/deposit/deposit";
import { DepositForm } from "~/deposit/DepositForm";
import { getUserSession, getSession, commitSession } from "~/session.server";

import { CreditCard } from "~/ui/CreditCard";
import { Navigation } from "~/ui/navigation/Navigation";
import { Page } from "~/ui/Page";
import { Stack } from "~/ui/Stack";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();

  const amount = formData.get("amount");
  const isToday = formData.get("today");
  const date = isToday
    ? new Date().toISOString().split("T")[0]
    : formData.get("date");

  const success = await createDeposit({
    request,
    amount: Number(amount),
    date: date as string,
  });

  if (!success) {
    return redirect("/?error=true");
  }

  session.flash("globalMessage", "Deposit created successfully!");

  return redirect("/", {
    headers: {
      "Set-cookie": await commitSession(session),
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  const userProfile = await getUserById({ request, uid: sessionUser.uid });

  return json({
    userProfile,
  });
};

export default function Profile() {
  const { userProfile } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Stack spacing={16}>
        <Navigation />

        <CreditCard user={userProfile} />
        <DepositForm />
      </Stack>
    </Page>
  );
}
