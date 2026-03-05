import { Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useEditProfessional, useListProfessionals } from "@/features/professional/hooks"
import { ModalEditProfessional, ModalToggleProfessional } from "../modal"

export function ListProfessional() {
  const {
    data: { dataProfessionals },
  } = useListProfessionals()
  const {
    actions: {
      formUpdateProfessional,
      handleSubmitUpdate,
      onSubmitInactive,
      toggleModal,
      toggleModalInactive,
    },
    data: { columns, modalInactive, modalOpen, professional },
    isLoading: { loadingProfessionalById, isPending },
  } = useEditProfessional()

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
          onSubmitUpdate={handleSubmitUpdate}
          isPending={isPending}
        />
      )}

      {modalInactive && professional && (
        <ModalToggleProfessional
          isOpen={modalInactive}
          toggle={toggleModalInactive}
          professional={professional}
          onSubmitInactive={onSubmitInactive}
          isPending={isPending}
        />
      )}
    </>
  )
}
