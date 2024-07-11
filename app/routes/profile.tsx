import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { requireUserSession } from "~/session.server";
import { CreditCard } from "~/ui/CreditCard";
import { Navigation } from "~/ui/navigation/Navigation";
import { Page } from "~/ui/Page";

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
      <Navigation />
      <div>
        <h1>Profile</h1>
        <p>{username}</p>
        <p>{email}</p>
        <Link to="/profile/edit">Edit profile</Link>
      </div>

      <CreditCard user={{ username }} />
    </Page>
  );
}
