import { BaseLayout, ButtonPrimitive, ModalComponent } from "@/core/ui"
import { FormProfessional, ListProfessional } from "../components"
import { useCreateProfessional, useListProfessionals } from "../hooks"

export function ProfessionalListPage() {
  const { modalOpen, toggleModalOpen, form, handleSubmit, mutationCreateProfessional } =
    useCreateProfessional()
  const { usersNotProfessionals } = useListProfessionals()

  return (
    <BaseLayout.Root title="Profissionais da Saúde" pageTitle="Administração">
      <BaseLayout.Header>
        <ButtonPrimitive
          variant="success"
          onClick={toggleModalOpen}
          disabled={usersNotProfessionals?.length === 0}
        >
          Vincular
        </ButtonPrimitive>
      </BaseLayout.Header>
      <BaseLayout.Body>
        <ListProfessional />
      </BaseLayout.Body>

      {modalOpen && (
        <ModalComponent.Root isOpen={modalOpen} toggle={toggleModalOpen} size="lg">
          <ModalComponent.Body>
            <FormProfessional formProfessional={form} users={usersNotProfessionals} />
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive
              variant="primary"
              className="mt-3"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={!form.formState.isValid}
              isLoading={mutationCreateProfessional.isPending}
            >
              Vincular
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}
    </BaseLayout.Root>
  )
}
