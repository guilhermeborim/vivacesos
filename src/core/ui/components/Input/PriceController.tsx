import { FormField } from "@/core/ui"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Input, InputGroup, InputGroupText } from "reactstrap"

interface PriceControllerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
}

const formatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Valor em reais: o usuário digita os centavos e o campo formata (1.234,56). */
export function PriceController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "0,00",
}: PriceControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} error={fieldState.error?.message}>
          <InputGroup>
            <InputGroupText>R$</InputGroupText>
            <Input
              name={field.name}
              innerRef={field.ref}
              onBlur={field.onBlur}
              inputMode="numeric"
              placeholder={placeholder}
              invalid={!!fieldState.error}
              value={typeof field.value === "number" ? formatter.format(field.value) : ""}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 10)
                field.onChange(digits ? Number(digits) / 100 : undefined)
              }}
            />
          </InputGroup>
        </FormField>
      )}
    />
  )
}
