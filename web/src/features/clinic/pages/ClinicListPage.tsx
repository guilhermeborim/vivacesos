import { ButtonPrimitive } from "core/ui/primitives/Button";
import { useNavigate } from "react-router-dom";
import { BasePage, HeaderList } from "shared/components";
import ListClinic from "../components/list";

export function ClinicListPage() {
  const navigate = useNavigate();

  return (
    <BasePage
      title="Clínicas"
      pageTitle="Administração"
      header={
        <HeaderList
          actions={
            <>
              <ButtonPrimitive
                variant="success"
                disabled
                onClick={() => navigate("/clinics/create")}
              >
                Adicionar
              </ButtonPrimitive>
            </>
          }
        />
      }
    >
      <ListClinic />
    </BasePage>
  );
}
