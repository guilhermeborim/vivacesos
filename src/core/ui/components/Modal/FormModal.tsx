import { BaseSyntheticEvent, ReactNode } from "react"
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form"
import { ModalProps } from "reactstrap"
import { ButtonPrimitive } from "../Button"
import { Body } from "./Body"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Root } from "./Root"

interface FormModalProps<T extends FieldValues> {
  isOpen: boolean
  toggle: () => void
  form: UseFormReturn<T>
  onSubmit: (e: BaseSyntheticEvent) => void
  isPending: boolean
  submitLabel: string
  mode?: "create" | "edit"
  title?: string
  size?: ModalProps["size"]
  children: ReactNode
}

export function FormModal<T extends FieldValues>({
  isOpen,
  toggle,
  form,
  onSubmit,
  isPending,
  submitLabel,
  mode = "create",
  title,
  size,
  children,
}: FormModalProps<T>) {
  const isCreate = mode === "create"

  return (
    <FormProvider {...form}>
      <Root isOpen={isOpen} toggle={toggle} size={size}>
        {title && <Header>{title}</Header>}
        <Body>{children}</Body>
        <Footer>
          <form onSubmit={onSubmit}>
            <ButtonPrimitive
              type={isCreate ? "submit" : undefined}
              variant={isCreate ? "primary" : "info"}
              disabled={isCreate ? !form.formState.isValid : undefined}
              isLoading={isPending}
            >
              {submitLabel}
            </ButtonPrimitive>
          </form>
        </Footer>
      </Root>
    </FormProvider>
  )
}
