import { Form, useNavigation } from "@remix-run/react";
import { DepositItem } from "~/deposit/deposit";
import { Button } from "~/ui/button/Button";
import { Fieldset } from "~/ui/form/Fieldset";

type Props = {
  deposit: DepositItem;
};

export const DeleteDepositForm = ({ deposit }: Props) => {
  const navigation = useNavigation();
  const isPending =
    navigation.formAction === `/deposit/${deposit.depositId}/edit`;
  const isDeleting = isPending && navigation.formMethod === "DELETE";

  return (
    <Form method="delete" key={`${deposit.depositId}`}>
      <Fieldset disabled={isDeleting}>
        <input type="hidden" name="depositId" value={deposit.depositId} />
        <Button
          type="submit"
          name="intent"
          value="delete"
          text={isDeleting ? "Deleting..." : "Delete"}
        />
      </Fieldset>
    </Form>
  );
};
