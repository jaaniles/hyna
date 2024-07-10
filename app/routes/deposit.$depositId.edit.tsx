import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getDepositById, updateDeposit } from "~/deposit/deposit";
import { requireUserSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = new URLSearchParams(await request.text());

  const depositId = formData.get("depositId");
  const amount = formData.get("amount");
  const date = formData.get("date");

  if (!depositId || !amount || !date) {
    return redirect("/");
  }

  await updateDeposit({ request, depositId, amount: Number(amount), date });

  return redirect(`/deposit/${depositId}/edit`);
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { depositId } = params;
  await requireUserSession(request);

  if (!depositId) {
    redirect("/");
    return;
  }

  const deposit = await getDepositById({ request, depositId });

  return json({
    deposit,
  });
};

export default function EditDeposit() {
  const { deposit } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Edit deposit</h1>

      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>

      <p>{deposit.depositId}</p>
      <p>{deposit.amount}</p>
      <p>{deposit.date}</p>
      <Form method="patch">
        <input type="number" name="amount" defaultValue={deposit.amount} />
        <input type="date" name="date" defaultValue={deposit.date} />
        <input type="hidden" name="depositId" value={deposit.depositId} />
        <button type="submit">Update</button>
      </Form>
    </div>
  );
}
