import { TableList } from "@/core/ui/components/Table"
import { useQueryUsers } from "../../api"
import { createUserColumns } from "./columns"

export function ListUser() {
  const { dataUsers } = useQueryUsers()
  // const {
  //   actions: { toggleModalEdit, formUpdateUser, onSubmitUserUpdate },
  //   data: { modalEdit },
  // } = useEditUser()

  const columns = createUserColumns({
    onEdit: () => {
      // toggleModalEdit()
    },
    onDelete: () => console.log("excluiu"),
  })

  return (
    <>
      <TableList.Root columns={columns} data={dataUsers || []} />

      {/* {modalEdit && (
        <ModalComponent.Root isOpen={modalEdit} toggle={toggleModalEdit}>
          <ModalComponent.Header>Editar Usuário</ModalComponent.Header>
          <ModalComponent.Body>
            <FormUser formUser={formUpdateUser} />
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive
              variant="info"
              onClick={formUpdateUser.handleSubmit(onSubmitUserUpdate)}
            >
              Atualizar
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )} */}
    </>
  )
}
