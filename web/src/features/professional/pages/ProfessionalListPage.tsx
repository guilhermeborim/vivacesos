import { BaseLayout, ButtonPrimitive } from "@/core/ui"
import { ListProfessional, ModalCreateProfessional } from "../components"
import { useCreateProfessional, useListProfessionals } from "../hooks"

export function ProfessionalListPage() {
  const {
    actions: { formCreateProfessional, handleSubmit, toggleModalOpen },
    data: { modalOpen },
    isLoading: { isPending },
  } = useCreateProfessional()
  const {
    data: { usersNotProfessionals },
  } = useListProfessionals()

  return (
    <>
      <BaseLayout.Root title="Profissionais da Saúde" pageTitle="Administração">
        <BaseLayout.Header>
          <ButtonPrimitive
            variant="primary"
            onClick={toggleModalOpen}
            disabled={usersNotProfessionals?.length === 0}
          >
            Vincular
          </ButtonPrimitive>
        </BaseLayout.Header>
        <BaseLayout.Body>
          <ListProfessional />
        </BaseLayout.Body>
      </BaseLayout.Root>
      {modalOpen && (
        <ModalCreateProfessional
          isOpen={modalOpen}
          toggle={toggleModalOpen}
          formCreateProfessional={formCreateProfessional}
          usersNotProfessionals={usersNotProfessionals}
          onSubmitCreate={handleSubmit}
          isPending={isPending}
        />
      )}
    </>
  )
}
