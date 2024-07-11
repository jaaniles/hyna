import { Stack } from "~/ui/Stack";
import { CurrencyInput } from "../inputs/CurrencyInput";

type Props = {
  id: string;
  name: string;
  label: string;
  defaultValue?: number;
  placeholder?: string | undefined;
  error?: string | undefined;
};

export function CurrencyField({
  id,
  name,
  label,
  defaultValue,
  placeholder,
}: Props) {
  return (
    <Stack spacing={4}>
      <label htmlFor={id}>{label}</label>

      <CurrencyInput
        id={id}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </Stack>
  );
}
