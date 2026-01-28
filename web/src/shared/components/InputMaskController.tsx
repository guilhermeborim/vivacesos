import { FormField } from "core/ui";
import { InputMask, InputMaskProps } from "primereact/inputmask";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface InputMaskControllerProps<
  T extends FieldValues,
> extends InputMaskProps {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  label?: string;
  mask: string;
}

export const InputMaskController = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  mask,
  ...rest
}: InputMaskControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message}>
          <InputMask
            {...field}
            {...rest}
            type={rest.type}
            placeholder={rest.placeholder}
            invalid={!!fieldState.error}
            mask={mask}
            className="form-control"
          />
        </FormField>
      )}
    />
  );
};
