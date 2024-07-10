import { Form, useNavigation } from "@remix-run/react";
import * as Switch from "@radix-ui/react-switch";
import stylex from "@stylexjs/stylex";
import { useState } from "react";

export const DepositForm = () => {
  const [showCustomDate, setShowCustomDate] = useState(false);
  const navigation = useNavigation();

  const today = new Date().toISOString().split("T")[0];

  const handleCustomDateChange = (checked: boolean) => {
    setShowCustomDate(!checked);
  };

  const isSubmitting = navigation.formAction === "/?index";

  return (
    <div>
      <h1>Deposit</h1>

      <Form method="post" {...stylex.props(styles.form)}>
        <fieldset disabled={isSubmitting}>
          <label htmlFor="amount">
            Amount:
            <input type="number" name="amount" />
          </label>

          <label htmlFor="today" {...stylex.props(styles.switch)}>
            Today
            <Switch.Root
              id="today"
              defaultChecked={true}
              onCheckedChange={handleCustomDateChange}
              name="today"
              value="today"
              {...stylex.props(styles.switchRoot)}
            >
              <Switch.Thumb {...stylex.props(styles.thumb)} />
            </Switch.Root>
          </label>

          <div {...stylex.props(!showCustomDate && styles.hidden)}>
            <label htmlFor="date">
              Date: <input type="date" name="date" defaultValue={today} />
            </label>
          </div>

          <button type="submit">
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </fieldset>
      </Form>
    </div>
  );
};

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  switch: {
    display: "flex",
    alignItems: "center",
  },
  switchRoot: {
    width: 42,
    height: 25,
    position: "relative",
    borderRadius: 16,
  },
  thumb: {
    display: "block",
    width: 21,
    height: 21,

    marginBottom: 15,

    backgroundColor: "white",
    borderRadius: 16,

    transition: "transform 100ms ease-in-out",
    willChange: "transform",
    transform: {
      default: "translateX(0px)",
      ":is([data-state='checked'])": "translateX(10px)",
    },
  },
  hidden: {
    display: "none",
  },
});
