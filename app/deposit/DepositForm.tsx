import { Form, useNavigation } from "@remix-run/react";
import stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Button } from "~/ui/button/Button";
import { Headline } from "~/ui/typography/Headline";
import { Fieldset } from "~/ui/form/Fieldset";
import { SwitchField } from "~/ui/fields/SwitchField";
import { DateField } from "~/ui/fields/DateField";
import { Stack } from "~/ui/Stack";
import { Text } from "~/ui/typography/Text";
import { CurrencyField } from "~/ui/fields/CurrencyField";

export const DepositForm = () => {
  const [showCustomDate, setShowCustomDate] = useState(false);
  const navigation = useNavigation();

  const today = new Date().toISOString().split("T")[0];

  const handleCustomDateChange = (checked: boolean) => {
    setShowCustomDate(!checked);
  };

  const isSubmitting = navigation.formAction === "/?index";

  return (
    <Stack spacing={16}>
      <Stack spacing={8}>
        <Headline as="h2">Create a deposit</Headline>
        <Text>Record your savings</Text>
      </Stack>
      <Form method="post" {...stylex.props(styles.form)}>
        <Fieldset disabled={isSubmitting}>
          <Stack spacing={16}>
            <Stack spacing={8}>
              <CurrencyField id="amount" name="amount" label="Amount" />

              <SwitchField
                id="today"
                name="today"
                label="Today"
                defaultValue={true}
                onChange={handleCustomDateChange}
              />

              <div {...stylex.props(!showCustomDate && styles.hidden)}>
                <DateField
                  id="date"
                  label="Date"
                  name="date"
                  defaultValue={today}
                />
              </div>
            </Stack>
            <Button
              type="submit"
              text={isSubmitting ? "Creating..." : "Create"}
            />
          </Stack>
        </Fieldset>
      </Form>
    </Stack>
  );
};

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  hidden: {
    display: "none",
  },
});
