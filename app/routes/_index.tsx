import { LoaderFunction, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getDeposits } from "~/deposit/deposit";
import { commitSession, getSession, getUserSession } from "~/session.server";
import { getUserById } from "~/auth/auth";
import { Current } from "~/ui/Current";
import { Page } from "~/ui/Page";
import { Navigation } from "~/ui/navigation/Navigation";
import { Stack } from "~/ui/Stack";
import { Deposits } from "~/deposit/Deposits";
import { Toast } from "~/ui/Toast";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  const userProfile = await getUserById({ request, uid: sessionUser.uid });
  const deposits = await getDeposits(request);

  const message = session.get("globalMessage") || null;

  return json(
    {
      message,
      deposits,
      userProfile,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export default function Index() {
  const { message, deposits, userProfile } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Stack spacing={16}>
        <Navigation />
        {message && <Toast description={message} />}

        <Current user={userProfile} deposits={deposits} />

        <Deposits deposits={deposits} />
      </Stack>
    </Page>
  );
}
