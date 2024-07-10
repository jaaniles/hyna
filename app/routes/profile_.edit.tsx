import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { updateProfile } from "~/auth/auth";
import { requireUserSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const username = formData.get("username");

  if (!username) {
    return json({ message: "Username is required" }, { status: 400 });
  }

  const user = {
    username: username as string,
  };

  await updateProfile({ request, user });

  return redirect("/profile");
};

export const loader: LoaderFunction = async ({ request }) => {
  const { email, user } = await requireUserSession(request);

  return json({
    email: email,
    username: user.username,
  });
};

export default function EditProfile() {
  const navigation = useNavigation();

  const { username } = useLoaderData<typeof loader>();
  const isUpdating = navigation.formAction === `/profile/edit`;

  return (
    <div>
      <h1>Edit profile</h1>
      <p>You are: {username}</p>

      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>

      <Form method="patch">
        <fieldset disabled={isUpdating}>
          <label htmlFor="username">
            Username
            <input type="text" name="username" defaultValue={username} />
          </label>
          <button type="submit">{isUpdating ? "Updating..." : "Update"}</button>
        </fieldset>
      </Form>
    </div>
  );
}
