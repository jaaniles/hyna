import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { requireUserSession } from "~/session.server";
import { CreditCard } from "~/ui/CreditCard";
import { Navigation } from "~/ui/navigation/Navigation";
import { Page } from "~/ui/Page";
import { Stack } from "~/ui/Stack";
import { Headline } from "~/ui/typography/Headline";
import { Text } from "~/ui/typography/Text";

export const loader: LoaderFunction = async ({ request }) => {
  const userSession = await requireUserSession(request);

  if (!userSession) {
    return redirect("/login");
  }

  const { email, user } = userSession;

  if (!user) {
    return redirect("/register");
  }

  return json({
    email: email,
    username: user.username,
  });
};

export default function Profile() {
  const { email, username } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Stack spacing={16}>
        <Navigation />

        <Headline as="h1">Profile</Headline>
        <CreditCard user={{ username }} />

        <Stack spacing={8}>
          <Text>{username}</Text>
          <Text>{email}</Text>
          <Link to="/profile/edit">Edit profile</Link>
        </Stack>
      </Stack>
    </Page>
  );
}
