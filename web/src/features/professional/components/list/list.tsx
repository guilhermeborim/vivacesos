import { ButtonPrimitive, Loading, ModalComponent } from "@/core/ui"
import { TableList } from "@/core/ui/components/Table"
import { useQueryProfessionals } from "@/features/professional/api/mutations"
import { useEditProfessional } from "@/features/professional/hooks"
import { FormProfessional } from "../form"
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
        <ModalComponent.Root isOpen={modalOpen} toggle={toggleModal}>
          <ModalComponent.Body>
            <h5>Atualize os dados do profissional</h5>
            <div className="p-4">
              <FormProfessional
                formProfessional={formUpdateProfessional}
                defaultValues={professional}
                users={[]}
                isEdit
              />
            </div>
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <form onSubmit={formUpdateProfessional.handleSubmit(onSubmitUpdate)}>
              <ButtonPrimitive variant="info">Atualizar</ButtonPrimitive>
            </form>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}

      {modalInactive && professional && (
        <ModalComponent.Root isOpen={modalInactive} toggle={toggleModalInactive}>
          <ModalComponent.Body>
            <h5>
              Tem certeza que deseja {professional.active ? "Inativar" : "Ativar"} este
              Profissional?
            </h5>
            <p>
              Você está prestes a{" "}
              <strong>{professional.active ? "inativar" : "ativar"}</strong> o
              profissional <strong>{professional.name ?? "selecionado"}</strong>.{" "}
              {professional.active
                ? "Ele não terá mais acesso ao sistema."
                : "Ele voltará a ter acesso ao sistema."}
            </p>
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive
              variant="success"
              onClick={() =>
                onSubmitInactive({ active: professional.active, id: professional.id })
              }
            >
              Sim
            </ButtonPrimitive>
            <ButtonPrimitive variant="warning" onClick={toggleModalInactive}>
              Não
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}
    </>
  )
}
