import { BaseLayout, ButtonPrimitive } from "@/core/ui"
import { ListClinic } from "../components"

export function ClinicListPage() {
  return (
    <BaseLayout.Root title="Clínicas" pageTitle="Administração">
      <BaseLayout.Header>
        <ButtonPrimitive variant="primary" disabled>
          Adicionar
        </ButtonPrimitive>
      </BaseLayout.Header>
      <BaseLayout.Body>
        <ListClinic />
      </BaseLayout.Body>
    </BaseLayout.Root>
  )
}
