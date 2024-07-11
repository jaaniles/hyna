import { Stack } from "~/ui/Stack";
import { HiddenInput } from "../inputs/HiddenInput";

type Props = {
  id: string;
  name: string;
  defaultValue?: string;
};

export function HiddenField({ id, name, defaultValue }: Props) {
  return (
    <Stack spacing={4}>
      <HiddenInput id={id} name={name} defaultValue={defaultValue} />
    </Stack>
  );
}
