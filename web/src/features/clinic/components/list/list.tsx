import { Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useEditClinic, useListClinics } from "../../hooks"
import { ModalEditClinic } from "../modals"

export function ListClinic() {
  const {
    data: { dataClinics },
  } = useListClinics()

  const {
    actions: { formUpdateClinic, handleSubmitUpdate, toggleModal },
    data: { clinic, columns, modalOpen },
    isLoading: { isPending, loadingClinicById },
  } = useEditClinic()

  return (
    <>
      {loadingClinicById && <Loading loading={loadingClinicById} />}
      <TableList.Root columns={columns} data={dataClinics || []} />

      {modalOpen && (
        <ModalEditClinic
          isOpen={modalOpen}
          toggle={toggleModal}
          formUpdateClinic={formUpdateClinic}
          clinic={clinic}
          handleSubmitUpdate={handleSubmitUpdate}
          isPending={isPending}
        />
      )}
    </>
  )
}
