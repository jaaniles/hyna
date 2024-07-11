import { Form, useNavigation } from "@remix-run/react";

import { Button } from "~/ui/button/Button";
import { NumberField } from "~/ui/fields/NumberField";
import { Fieldset } from "~/ui/form/Fieldset";
import { DateField } from "~/ui/fields/DateField";
import { Stack } from "~/ui/Stack";
import { DepositItem } from "~/deposit/deposit";

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
        <Stack spacing={16}>
          <Stack spacing={8}>
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
          </Stack>

          <Button
            type="submit"
            name="intent"
            value="edit"
            text={isUpdating ? "Updating..." : "Update"}
          />
        </Stack>
      </Fieldset>
    </Form>
  );
};
