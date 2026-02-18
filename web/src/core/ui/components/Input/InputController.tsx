import { FormField, InputPrimitive } from "@/core/ui";
import { InputMask } from "primereact/inputmask";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { InputProps } from "reactstrap";

interface InputControllerProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  mask?: string;
}

export function InputController<T extends FieldValues>({
  control,
  name,
  label,
  mask,
  ...rest
}: InputControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message}>
          {mask ? (
            <InputMask
              {...field}
              type={rest.type}
              placeholder={rest.placeholder}
              invalid={!!fieldState.error}
              mask={mask}
              className="form-control"
              onChange={(e) =>
                field.onChange(e?.target?.value?.replace(/\D/g, ""))
              }
            />
          ) : (
            <InputPrimitive {...field} {...rest} invalid={!!fieldState.error} />
          )}
        </FormField>
      )}
    />
  );
}
