import { FormModal, Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useQueryPatients } from "../../api/queries"
import { useEditPatient } from "../../hooks/use-edit-patient"
import { FormPatient } from "../form/form"
import { createPatientColumns } from "./columns"

export function ListPatient() {
  const { dataPatients } = useQueryPatients()
  const edit = useEditPatient()
  const columns = createPatientColumns({ onEdit: edit.openEdit })

  return (
    <>
      {edit.loadingPatientById && <Loading loading={edit.loadingPatientById} />}
      <TableList.Root columns={columns} data={dataPatients || []} />

      {edit.modalOpen && edit.patient && (
        <FormModal
          mode="edit"
          size="xl"
          title="Atualizar dados do paciente"
          submitLabel="Atualizar"
          isOpen={edit.modalOpen}
          toggle={edit.toggleModal}
          form={edit.form}
          onSubmit={edit.handleSubmitUpdate}
          isPending={edit.isPending}
        >
          <FormPatient defaultValues={edit.patient} />
        </FormModal>
      )}
    </>
  )
}
