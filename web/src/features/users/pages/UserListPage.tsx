import { BaseLayout, ButtonPrimitive, ModalComponent } from "core/ui";
import FormUser from "../components/form";
import ListUser from "../components/list";
import { useInviteUser } from "../hooks";

export function UserListPage() {
  const { modalInvite, toggleModalInvite, formUser, onSubmitInvite } =
    useInviteUser();

  return (
    <BaseLayout.Root title="Acessos" pageTitle="Administração">
      <BaseLayout.Header>
        <ButtonPrimitive variant="success" onClick={toggleModalInvite}>
          Convidar
        </ButtonPrimitive>
      </BaseLayout.Header>
      <BaseLayout.Body>
        <ListUser />
      </BaseLayout.Body>
      {modalInvite && (
        <ModalComponent.Root
          isOpen={modalInvite}
          toggle={toggleModalInvite}
          size="lg"
        >
          <ModalComponent.Body>
            <div className="mb-4">
              <h6>
                Este convite tem duração de 24 horas, após isso é necessário um
                novo convite.
              </h6>
            </div>
            <FormUser formUser={formUser} />
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive
              onClick={formUser.handleSubmit(onSubmitInvite)}
              className="mt-3"
            >
              Convidar
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}
    </BaseLayout.Root>
  );
}
