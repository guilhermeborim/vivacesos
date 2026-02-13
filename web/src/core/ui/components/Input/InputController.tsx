import { FormField, InputPrimitive } from "@/core/ui";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { InputProps } from "reactstrap";

interface InputControllerProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function InputController<T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: InputControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message}>
          <InputPrimitive {...field} {...rest} invalid={!!fieldState.error} />
        </FormField>
      )}
    />
  );
}
