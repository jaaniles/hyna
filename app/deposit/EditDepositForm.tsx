import { Form, useNavigation } from "@remix-run/react";
import { DepositItem } from "./deposit";

type Props = {
  deposit: DepositItem;
};

export const EditDepositForm = ({ deposit }: Props) => {
  const navigation = useNavigation();
  const isPending =
    navigation.formAction === `/deposit/${deposit.depositId}/edit`;
  const isUpdating = isPending && navigation.formMethod === "PATCH";

  return (
    <Form method="patch">
      <fieldset disabled={isUpdating}>
        <input type="number" name="amount" defaultValue={deposit.amount} />
        <input type="date" name="date" defaultValue={deposit.date} />
        <input type="hidden" name="depositId" value={deposit.depositId} />

        <button type="submit" name="intent" value="edit">
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </fieldset>
    </Form>
  );
};
