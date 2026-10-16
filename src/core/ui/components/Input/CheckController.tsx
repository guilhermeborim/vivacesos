import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { FormGroup, Input, Label } from "reactstrap"

interface CheckControllerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  variant?: "switch" | "checkbox"
}

export function CheckController<T extends FieldValues>({
  control,
  name,
  label,
  variant = "checkbox",
}: CheckControllerProps<T>) {
  const isSwitch = variant === "switch"

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormGroup switch={isSwitch} check={!isSwitch}>
          <Input
            id={`${name}-${variant}`}
            type={isSwitch ? "switch" : "checkbox"}
            role={isSwitch ? "switch" : undefined}
            name={field.name}
            innerRef={field.ref}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          />
          <Label check htmlFor={`${name}-${variant}`}>
            {label}
          </Label>
        </FormGroup>
      )}
    />
  )
}
