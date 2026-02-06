import { ButtonPrimitive } from "core/ui/primitives/Button";
import { useQueryUsers } from "features/users/api/mutations";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { BasePage, HeaderList } from "shared/components";
import { useQueryProfessionals } from "../api/mutations";
import FormProfessional from "../components/form";
import ListClinic from "../components/list";
import { useProfessional } from "../hooks";

export function ProfessionalListPage() {
  const { modalOpen, toggleModalOpen, form, handleSubmit } = useProfessional();
  const { dataProfessionals } = useQueryProfessionals();
  const { dataUsers } = useQueryUsers();

  const professionals = dataProfessionals?.data ?? [];

  const usersNotProfessionals = dataUsers?.data.filter(
    (user: any) =>
      !professionals.some((prof: any) => prof.user.id === user.user.id_user),
  );

  return (
    <BasePage
      title="Profissionais da Saúde"
      pageTitle="Administração"
      header={
        <HeaderList
          actions={
            <>
              <ButtonPrimitive variant="success" onClick={toggleModalOpen}>
                Vincular
              </ButtonPrimitive>
              {/* <ButtonPrimitive variant="info">Exportar</ButtonPrimitive> */}
            </>
          }
        />
      }
    >
      <ListClinic data={dataProfessionals?.data} />

      {modalOpen && (
        <Modal isOpen={modalOpen} centered toggle={toggleModalOpen} size="lg">
          <ModalBody>
            <FormProfessional
              formProfessional={form}
              users={usersNotProfessionals}
            />
          </ModalBody>
          <ModalFooter className="border border-top mt-3">
            <ButtonPrimitive
              variant="primary"
              className="mt-3"
              onClick={form.handleSubmit(handleSubmit)}
            >
              Vincular
            </ButtonPrimitive>
          </ModalFooter>
        </Modal>
      )}
    </BasePage>
  );
}
