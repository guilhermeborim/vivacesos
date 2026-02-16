import { BaseLayout, ButtonPrimitive, ModalComponent } from "@/core/ui";
import { useQueryUsers } from "@/features/users/api/mutations";
import { Professional, User } from "@/shared/types";
import { useQueryProfessionals } from "../api/mutations";
import { FormProfessional, ListProfessional } from "../components";
import { useProfessional } from "../hooks";

export function ProfessionalListPage() {
  const {
    modalOpen,
    toggleModalOpen,
    form,
    handleSubmit,
    mutationCreateProfessional,
  } = useProfessional();
  const { dataProfessionals } = useQueryProfessionals();
  const { dataUsers } = useQueryUsers();

  const professionals = dataProfessionals ?? [];

  const usersNotProfessionals = dataUsers?.filter(
    (user: User) =>
      !professionals.some((prof: Professional) => prof.userId === user.id_user),
  );

  return (
    <BaseLayout.Root title="Profissionais da Saúde" pageTitle="Administração">
      <BaseLayout.Header>
        <ButtonPrimitive
          variant="success"
          onClick={toggleModalOpen}
          disabled={usersNotProfessionals.length === 0}
        >
          Vincular
        </ButtonPrimitive>
      </BaseLayout.Header>
      <BaseLayout.Body>
        <ListProfessional />
      </BaseLayout.Body>

      {modalOpen && (
        <ModalComponent.Root
          isOpen={modalOpen}
          toggle={toggleModalOpen}
          size="lg"
        >
          <ModalComponent.Body>
            <FormProfessional
              formProfessional={form}
              users={usersNotProfessionals}
            />
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive
              variant="primary"
              className="mt-3"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={!form.formState.isValid}
              isLoading={mutationCreateProfessional.isPending}
            >
              Vincular
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}
    </BaseLayout.Root>
  );
}
