import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";

import { registerUser } from "~/auth/auth";
import { getUserSession } from "~/session.server";
import { Button } from "~/ui/button/Button";
import { TextField } from "~/ui/fields/TextField";
import { Fieldset } from "~/ui/form/Fieldset";
import { Navigation } from "~/ui/navigation/Navigation";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userSession = await getUserSession(request);

  const formData = await request.formData();
  const username = formData.get("username") as string;

  if (!username) {
    return null;
  }

  await registerUser({
    request,
    user: {
      uid: userSession?.uid as string,
      username,
    },
  });

  return redirect("/");
};

export default function Register() {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === `/register`;

  return (
    <div>
      <h1>Register form</h1>

      <Navigation />

      <Form method="post">
        <Fieldset disabled={isSubmitting}>
          <TextField label="Username" id="username" name="username" />
          <Button
            type="submit"
            text={isSubmitting ? "Registering..." : "Register"}
          />
        </Fieldset>
      </Form>
    </div>
  );
}
