import { BaseLayout, ButtonPrimitive } from "@/core/ui";
import { ListPatient } from "../components";
import { usePostPatient } from "../hooks";

export function PatientListPage() {
  const { formPatient, onSubmitPatient } = usePostPatient();

  return (
    <BaseLayout.Root title="Acessos" pageTitle="Administração">
      <BaseLayout.Header>
        <ButtonPrimitive variant="success">Cadastrar</ButtonPrimitive>
      </BaseLayout.Header>
      <BaseLayout.Body>
        <ListPatient />
      </BaseLayout.Body>
    </BaseLayout.Root>
  );
}
