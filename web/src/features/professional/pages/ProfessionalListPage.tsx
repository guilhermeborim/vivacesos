import { BaseLayout, ButtonPrimitive } from "@/core/ui"
import { ListProfessional, ModalCreateProfessional } from "../components"
import { useCreateProfessional, useListProfessionals } from "../hooks"

export function ProfessionalListPage() {
  const { modalOpen, toggleModalOpen, form, handleSubmit, mutationCreateProfessional } =
    useCreateProfessional()
  const { usersNotProfessionals } = useListProfessionals()

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
          form={form}
          usersNotProfessionals={usersNotProfessionals}
          handleSubmit={handleSubmit}
          isPending={mutationCreateProfessional.isPending}
        />
      )}
    </>
  )
}
