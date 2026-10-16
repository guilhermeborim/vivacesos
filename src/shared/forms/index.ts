import { Path } from "react-hook-form"
import { InputType } from "reactstrap/types/lib/Input"

export type FieldConfig<T> =
  | {
      name: Path<T>
      label: string
      placeholder?: string
      md?: number | string
      type: InputType
      mask?: string
      minLength?: number
      maxLength?: number
      readonly?: boolean
      disabled?: boolean
      options?: never
    }
  | {
      name: Path<T>
      label: string
      placeholder?: string
      md?: number | string
      type: "select"
      options: {
        label: string
        value: string | number
        isDisabled?: boolean
      }[]
      readonly?: boolean
      disabled?: boolean
      minLength?: never
      maxLength?: never
      mask?: never
    }
