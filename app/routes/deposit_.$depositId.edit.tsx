import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DeleteDepositForm } from "~/deposit/DeleteDepositForm";
import {
  deleteDeposit,
  getDepositById,
  updateDeposit,
} from "~/deposit/deposit";
import { EditDepositForm } from "~/deposit/EditDepositForm";
import { requireUserSession } from "~/session.server";
import { Navigation } from "~/ui/navigation/Navigation";
import { Page } from "~/ui/Page";
import { Stack } from "~/ui/Stack";
import { Headline } from "~/ui/typography/Headline";
import { Text } from "~/ui/typography/Text";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "edit":
      return await updateDepositAction(request, formData);
    case "delete":
      return await deleteDepositAction(request, formData);
    default:
      throw new Error("Unexpected action intent");
  }
};

const updateDepositAction = async (request: Request, formData: FormData) => {
  const depositId = formData.get("depositId");
  const amount = formData.get("amount");
  const date = formData.get("date");

  if (!depositId || !amount || !date) {
    return redirect("/");
  }

  await updateDeposit({
    request,
    depositId: depositId as string,
    amount: Number(amount),
    date: date as string,
  });

  return redirect(`/deposit/${depositId}/edit`);
};

const deleteDepositAction = async (request: Request, formData: FormData) => {
  const depositId = formData.get("depositId");
  await deleteDeposit({ request, depositId: depositId as string });

  return redirect("/");
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
    <Page>
      <Stack spacing={16}>
        <Navigation />
        <Headline as="h1">Edit deposit</Headline>

        <Text>{deposit.depositId}</Text>
        <Text>{deposit.amount}</Text>
        <Text>{deposit.date}</Text>

        <EditDepositForm deposit={deposit} />

        <Headline as="h3">Delete deposit</Headline>
        <DeleteDepositForm deposit={deposit} />
      </Stack>
    </Page>
  );
}
