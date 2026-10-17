import { ConfirmStatusModal, FormModal, ModalComponent } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { Professional } from "@/shared/types"
import { useState } from "react"
import { AvailabilityEditor } from "../availability/availability-editor"
import { useQueryProfessionals } from "../../api/queries"
import { useEditProfessional } from "../../hooks/use-edit-professional"
import { FormProfessional } from "../form/form"
import { professionalColumns } from "./columns"

export function ListProfessional() {
  const { dataProfessionals } = useQueryProfessionals()
  const edit = useEditProfessional()
  const { professional } = edit
  const [scheduling, setScheduling] = useState<Professional | null>(null)
  const columns = professionalColumns({
    onEdit: edit.openEdit,
    onInactive: edit.openInactive,
    onAvailability: setScheduling,
  })

  return (
    <>
      <TableList.Root columns={columns} data={dataProfessionals || []} />

      {edit.modalOpen && (
        <FormModal
          mode="edit"
          title="Atualize os dados do profissional"
          submitLabel="Atualizar"
          isOpen={edit.modalOpen}
          toggle={edit.toggleModal}
          form={edit.form}
          onSubmit={edit.handleSubmitUpdate}
          isPending={edit.isPending}
        >
          <FormProfessional defaultValues={professional} isEdit />
        </FormModal>
      )}

      {scheduling && (
        <ModalComponent.Root isOpen size="xl" toggle={() => setScheduling(null)}>
          <ModalComponent.Header>
            Horários de atendimento — {scheduling.professional.name}
          </ModalComponent.Header>
          <ModalComponent.Body>
            <AvailabilityEditor
              professionalId={scheduling.professional.professionalId}
              onSaved={() => setScheduling(null)}
            />
          </ModalComponent.Body>
        </ModalComponent.Root>
      )}

      {edit.modalInactive && professional && (
        <ConfirmStatusModal
          entity="profissional"
          isOpen={edit.modalInactive}
          toggle={edit.toggleModalInactive}
          name={professional.name}
          active={professional.active}
          onConfirm={() =>
            edit.onSubmitInactive({
              active: !professional.active,
              id: professional.id,
            })
          }
          isPending={edit.isPending}
        />
      )}
    </>
  )
}
