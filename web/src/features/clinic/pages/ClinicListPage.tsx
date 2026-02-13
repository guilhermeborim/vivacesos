import { BaseLayout, ButtonPrimitive } from "core/ui";
import { useNavigate } from "react-router-dom";
import ListClinic from "../components/list";

export function ClinicListPage() {
  const navigate = useNavigate();

  return (
    <BaseLayout.Root title="Clínicas" pageTitle="Administração">
      <BaseLayout.Header>
        <ButtonPrimitive
          variant="success"
          disabled
          onClick={() => navigate("/clinics/create")}
        >
          Adicionar
        </ButtonPrimitive>
      </BaseLayout.Header>
      <BaseLayout.Body>
        <ListClinic />
      </BaseLayout.Body>
    </BaseLayout.Root>
  );
}
