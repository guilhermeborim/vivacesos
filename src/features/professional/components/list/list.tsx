import { ConfirmStatusModal, FormModal, Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useQueryProfessionals } from "../../api/queries"
import { useEditProfessional } from "../../hooks/use-edit-professional"
import { FormProfessional } from "../form/form"
import { professionalColumns } from "./columns"

export function ListProfessional() {
  const { dataProfessionals } = useQueryProfessionals()
  const edit = useEditProfessional()
  const { professional } = edit
  const columns = professionalColumns({
    onEdit: edit.openEdit,
    onInactive: edit.openInactive,
  })

  return (
    <>
      {edit.loadingProfessionalById && <Loading loading={edit.loadingProfessionalById} />}
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
