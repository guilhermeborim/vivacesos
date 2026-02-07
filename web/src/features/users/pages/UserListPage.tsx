import { ButtonPrimitive } from "core/ui/primitives/Button";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { BasePage, HeaderList } from "shared/components";
import { DeleteConfirmModal } from "shared/components/DeleteConfirmModal";
import FormUser from "../components/form";
import ListUser from "../components/list";
import { useInviteUser } from "../hooks";

export function UserListPage() {
  const { modalInvite, toggleModalInvite, formUser, onSubmitInvite } =
    useInviteUser();

  return (
    <BasePage
      title="Acessos"
      pageTitle="Administração"
      header={
        <HeaderList
          actions={
            <>
              <ButtonPrimitive variant="success" onClick={toggleModalInvite}>
                Convidar
              </ButtonPrimitive>
              {/* <ButtonPrimitive variant="info">Exportar</ButtonPrimitive> */}
            </>
          }
        />
      }
    >
      <ListUser />

      {modalInvite && (
        <Modal
          isOpen={modalInvite}
          toggle={toggleModalInvite}
          size="lg"
          centered
        >
          <ModalBody>
            <div className="mb-4">
              <h6>
                Este convite tem duração de 24 horas, após isso é necessário um
                novo convite.
              </h6>
            </div>
            <FormUser formUser={formUser} />
          </ModalBody>
          <ModalFooter className="border border-top mt-3">
            <ButtonPrimitive
              onClick={formUser.handleSubmit(onSubmitInvite)}
              className="mt-3"
            >
              Convidar
            </ButtonPrimitive>
          </ModalFooter>
        </Modal>
      )}

      <DeleteConfirmModal
        isOpen={true}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    </BasePage>
  );
}
