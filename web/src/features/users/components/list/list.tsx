import { Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useEditUser, useListUsers } from "@/features/users/hooks"
import { ModalEditUser, ModalStatusUser } from "../modal"

export function ListUser() {
  const {
    data: { dataUsers },
  } = useListUsers()

  const {
    actions: {
      formUpdateUser,
      handleSubmitUpdate,
      handleSubmitUpdateStatus,
      toggleModal,
      toggleModalInactive,
    },
    data: { columns, modalInactive, modalOpen, user },
    isLoading: { loadingUserById, isPending },
  } = useEditUser()

  return (
    <>
      {loadingUserById && <Loading loading={loadingUserById} />}
      <TableList.Root columns={columns} data={dataUsers || []} />

      {modalOpen && user && (
        <ModalEditUser
          isOpen={modalOpen}
          toggle={toggleModal}
          formUpdateUser={formUpdateUser}
          user={user}
          onSubmitUpdate={handleSubmitUpdate}
          isPending={isPending}
        />
      )}

      {modalInactive && user && (
        <ModalStatusUser
          isOpen={modalInactive}
          toggle={toggleModalInactive}
          user={user}
          handleSubmitStatus={handleSubmitUpdateStatus}
          isPending={isPending}
        />
      )}
    </>
  )
}
