import { TableList } from "@/core/ui/components/Table"
import { useQueryClinic, useQueryClinicById } from "@/features/clinic/api/mutations"
import { useEditClinic } from "@/features/clinic/hooks/use-edit-clinic"
import { ModalEditClinic } from "../modal"
import { createClinicColumns } from "./columns"

export function ListClinic() {
  const { formUpdateClinic, onSubmitClinicUpdate, modalOpen, toggleModal, editClinicId } =
    useEditClinic()
  const { clinic } = useQueryClinicById(editClinicId)
  const { dataClinics } = useQueryClinic()

  const columns = createClinicColumns({
    onEdit: () => console.log("editou"),
    onDelete: () => console.log("excluiu"),
  })

  return (
    <>
      <TableList.Root columns={columns} data={dataClinics || []} />

      {modalOpen && (
        <ModalEditClinic
          isOpen={modalOpen}
          toggle={toggleModal}
          formUpdateClinic={formUpdateClinic}
          clinic={clinic}
          onSubmitClinicUpdate={onSubmitClinicUpdate}
        />
      )}
    </>
  )
}
