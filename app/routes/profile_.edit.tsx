import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { updateProfile } from "~/auth/auth";
import { requireUserSession } from "~/session.server";
import { Button } from "~/ui/button/Button";
import { TextField } from "~/ui/fields/TextField";
import { Fieldset } from "~/ui/form/Fieldset";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const username = formData.get("username");

  if (!username) {
    return json({ message: "Username is required" }, { status: 400 });
  }

  const user = {
    username: username as string,
  };

  return updateProfile({ request, user });
};

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
        <Fieldset disabled={isUpdating}>
          <TextField
            label="Username"
            id="username"
            name="username"
            defaultValue={username}
          />
          <Button type="submit" text={isUpdating ? "Updating..." : "Update"} />
        </Fieldset>
      </Form>
    </div>
  );
}
