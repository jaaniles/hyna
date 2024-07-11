import { Stack } from "~/ui/Stack";
import { NumberInput } from "../inputs/NumberInput";

type Props = {
  id: string;
  name: string;
  label: string;
  defaultValue?: number;
  placeholder?: string | undefined;
  error?: string | undefined;
};

export function NumberField({
  id,
  name,
  label,
  defaultValue,
  placeholder,
}: Props) {
  return (
    <Stack spacing={4}>
      <label htmlFor={id}>{label}</label>

      <NumberInput
        id={id}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </Stack>
  );
}
