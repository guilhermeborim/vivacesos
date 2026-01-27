import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import Select from "react-select";
import { FormFeedback, Label } from "reactstrap";

interface Option {
  label: string;
  value: string;
}

interface SelectControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  isClearable?: boolean;
  disabled?: boolean;
}

export function SelectController<T extends FieldValues>({
  name,
  control,
  errors,
  label,
  options,
  placeholder = "Selecione...",
  isClearable = true,
  disabled,
}: SelectControllerProps<T>) {
  const error = errors?.[name]?.message as string | undefined;

  return (
    <div className="mb-3">
      {label && (
        <Label htmlFor={name} className="form-label">
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const selectedOption =
            options.find((opt) => opt.value === field.value) ?? null;

          return (
            <>
              <Select
                inputId={name}
                options={options}
                value={selectedOption}
                placeholder={placeholder}
                isClearable={isClearable}
                onChange={(option: any) =>
                  field.onChange(option?.value ?? null)
                }
                classNamePrefix="react-select"
                className={error ? "is-invalid" : ""}
                isDisabled={disabled}
              />

              {error && (
                <FormFeedback style={{ display: "block" }}>
                  {error}
                </FormFeedback>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
