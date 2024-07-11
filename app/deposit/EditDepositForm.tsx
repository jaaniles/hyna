import { Form, useNavigation } from "@remix-run/react";
import { DepositItem } from "./deposit";
import { Button } from "~/ui/button/Button";
import { NumberField } from "~/ui/fields/NumberField";
import { Fieldset } from "~/ui/form/Fieldset";
import { DateField } from "~/ui/fields/DateField";

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
      <Fieldset disabled={isUpdating}>
        <NumberField
          label="Amount"
          id="amount"
          name="amount"
          defaultValue={deposit.amount}
        />
        <DateField
          id="date"
          label="Date"
          name="date"
          defaultValue={deposit.date}
        />
        <input type="hidden" name="depositId" value={deposit.depositId} />

        <Button
          type="submit"
          name="intent"
          value="edit"
          text={isUpdating ? "Updating..." : "Update"}
        />
      </Fieldset>
    </Form>
  );
};
