import { FormModal, Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useQueryClinic } from "../../api/queries"
import { useEditClinic } from "../../hooks/use-edit-clinic"
import { FormClinic } from "../form"
import { clinicColumns } from "./columns"

export function ListClinic() {
  const { dataClinics } = useQueryClinic()
  const edit = useEditClinic()
  const columns = clinicColumns({
    onEdit: edit.openEdit,
    onInactive: edit.openInactive,
  })

  return (
    <>
      {edit.loadingClinicById && <Loading loading={edit.loadingClinicById} />}
      <TableList.Root columns={columns} data={dataClinics || []} />

      {edit.modalOpen && (
        <FormModal
          mode="edit"
          size="xl"
          title="Atualize os dados da Clínica"
          submitLabel="Atualizar"
          isOpen={edit.modalOpen}
          toggle={edit.toggleModal}
          form={edit.form}
          onSubmit={edit.handleSubmitUpdate}
          isPending={edit.isPending}
        >
          <FormClinic defaultValues={edit.clinic} formClinic={edit.form} />
        </FormModal>
      )}
    </>
  )
}
