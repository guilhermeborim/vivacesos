import { BaseLayout, ButtonPrimitive, ModalComponent } from "@/core/ui";
import { FormPatient, ListPatient } from "../components";
import { usePostPatient } from "../hooks";

export function PatientListPage() {
  const { formPatient, onSubmitPatient, modal, toggleModal } = usePostPatient();

  return (
    <>
      <BaseLayout.Root title="Pacientes" pageTitle="Recepção">
        <BaseLayout.Header>
          <ButtonPrimitive variant="success" onClick={toggleModal}>
            Cadastrar
          </ButtonPrimitive>
        </BaseLayout.Header>
        <BaseLayout.Body>
          <ListPatient />
        </BaseLayout.Body>
      </BaseLayout.Root>
      <ModalComponent.Root isOpen={modal} toggle={toggleModal} size="xl">
        <ModalComponent.Header>Cadastro de Pacientes</ModalComponent.Header>
        <ModalComponent.Body>
          <FormPatient formPatient={formPatient} />
        </ModalComponent.Body>
        <ModalComponent.Footer>
          <ButtonPrimitive
            variant="success"
            onClick={formPatient.handleSubmit(onSubmitPatient)}
          >
            Salvar
          </ButtonPrimitive>
        </ModalComponent.Footer>
      </ModalComponent.Root>
    </>
  );
}
