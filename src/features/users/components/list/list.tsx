import { ConfirmStatusModal, FormModal, Loading } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { ClinicUserStatus } from "@/shared/enums"
import { useMutationResendInvite } from "../../api/mutations"
import { useQueryUsers } from "../../api/queries"
import { useEditUser } from "../../hooks/use-edit-user"
import { FormUser } from "../form/form"
import { userColumns } from "./columns"

export function ListUser() {
  const { dataUsers } = useQueryUsers()
  const edit = useEditUser()
  const resend = useMutationResendInvite()
  const { user } = edit
  const columns = userColumns({
    onEdit: edit.openEdit,
    onInactive: edit.openInactive,
    onResend: resend.mutate,
    currentUserId: edit.currentUserId,
  })
  const isActive = user?.status === ClinicUserStatus.ATIVO

  return (
    <>
      {edit.loadingUserById && <Loading loading={edit.loadingUserById} />}
      <TableList.Root columns={columns} data={dataUsers || []} />

      {edit.modalOpen && user && (
        <FormModal
          mode="edit"
          title="Atualize os dados do usuário"
          submitLabel="Atualizar"
          isOpen={edit.modalOpen}
          toggle={edit.toggleModal}
          form={edit.form}
          onSubmit={edit.handleSubmitUpdate}
          isPending={edit.isPending}
        >
          <FormUser defaultValues={user} isEdit />
        </FormModal>
      )}

      {edit.modalInactive && user && (
        <ConfirmStatusModal
          entity="usuário"
          isOpen={edit.modalInactive}
          toggle={edit.toggleModalInactive}
          name={user.user.name}
          active={isActive}
          onConfirm={() =>
            edit.handleSubmitUpdateStatus({
              status: isActive ? ClinicUserStatus.INATIVO : ClinicUserStatus.ATIVO,
            })
          }
          isPending={edit.isPending}
        />
      )}
    </>
  )
}
