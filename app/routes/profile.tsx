import { LoaderFunction } from "@remix-run/node";
import { Link, redirect } from "@remix-run/react";
import { db } from "~/firebase.server";
import { getUserSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  const querySnapshot = await db.collection("posts").get();

  const data = [] as unknown[];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return {
    user: {
      email: sessionUser.email,
      id: sessionUser.id,
    },
  };
};

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>

      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
