import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { FormFeedback, Input, InputProps, Label } from "reactstrap";

interface InputControllerProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  label?: string;
}

export const InputController = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  ...rest
}: InputControllerProps<T>) => {
  return (
    <>
      {label && (
        <Label htmlFor={name} className="form-label">
          {label}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              {...rest}
              type={rest.type}
              placeholder={rest.placeholder}
              invalid={!!fieldState.error}
            />
            {fieldState.error && (
              <FormFeedback>{fieldState.error.message}</FormFeedback>
            )}
          </>
        )}
      />
    </>
  );
};
