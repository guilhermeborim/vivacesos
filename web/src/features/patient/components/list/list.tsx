import { Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useEditPatient, useListPatients } from "../../hooks"
import { ModalEditPatient } from "../modal"

export function ListPatient() {
  const {
    data: { dataPatients },
  } = useListPatients()
  const {
    actions: { formUpdatePatient, handleSubmitUpdate, toggleModal },
    data: { columns, modalOpen, patient },
    isLoading: { loadingPatientById, isPending },
  } = useEditPatient()

  return (
    <>
      {loadingPatientById && <Loading loading={loadingPatientById} />}
      <TableList.Root columns={columns} data={dataPatients || []} />

      {modalOpen && patient && (
        <ModalEditPatient
          isOpen={modalOpen}
          toggle={toggleModal}
          formUpdatePatient={formUpdatePatient}
          patient={patient}
          onSubmitUpdate={handleSubmitUpdate}
          isPending={isPending}
        />
      )}
    </>
  )
}
