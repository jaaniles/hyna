import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { updateProfile } from "~/auth/auth";
import { requireUserSession } from "~/session.server";
import { Button } from "~/ui/button/Button";
import { TextField } from "~/ui/fields/TextField";
import { Fieldset } from "~/ui/form/Fieldset";
import { Navigation } from "~/ui/navigation/Navigation";
import { Page } from "~/ui/Page";
import { Stack } from "~/ui/Stack";
import { Headline } from "~/ui/typography/Headline";
import { Text } from "~/ui/typography/Text";

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
    <Page>
      <Stack spacing={16}>
        <Navigation />
        <Headline as="h1">Edit profile</Headline>
        <Text>You are: {username}</Text>

        <Form method="patch">
          <Fieldset disabled={isUpdating}>
            <Stack spacing={8}>
              <TextField
                label="Username"
                id="username"
                name="username"
                defaultValue={username}
              />
              <Button
                type="submit"
                text={isUpdating ? "Updating..." : "Update"}
              />
            </Stack>
          </Fieldset>
        </Form>
      </Stack>
    </Page>
  );
}
