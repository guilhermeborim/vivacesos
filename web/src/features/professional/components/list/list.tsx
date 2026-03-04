import { Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useQueryProfessionals } from "@/features/professional/api/mutations"
import { useEditProfessional } from "@/features/professional/hooks"
import { ModalEditProfessional, ModalToggleProfessional } from "../modal"
import { professionalColumns } from "./columns"

export function ListProfessional() {
  const { dataProfessionals } = useQueryProfessionals()
  const {
    formUpdateProfessional,
    onSubmitUpdate,
    onSubmitInactive,
    modalOpen,
    handleInactive,
    modalInactive,
    toggleModal,
    handleEdit,
    professional,
    toggleModalInactive,
    loadingProfessionalById,
  } = useEditProfessional()

  const columns = professionalColumns({
    onEdit: handleEdit,
    onInactive: handleInactive,
  })

  return (
    <>
      {loadingProfessionalById && <Loading loading={loadingProfessionalById} />}
      <TableList.Root columns={columns} data={dataProfessionals || []} />

      {modalOpen && (
        <ModalEditProfessional
          isOpen={modalOpen}
          toggle={toggleModal}
          formUpdateProfessional={formUpdateProfessional}
          professional={professional}
          onSubmitUpdate={onSubmitUpdate}
        />
      )}

      {modalInactive && professional && (
        <ModalToggleProfessional
          isOpen={modalInactive}
          toggle={toggleModalInactive}
          professional={professional}
          onSubmitInactive={onSubmitInactive}
        />
      )}
    </>
  )
}
