import { ButtonPrimitive } from "core/ui/primitives/Button";
import { useNavigate } from "react-router-dom";
import { BasePage, HeaderList } from "shared/components";
import ListClinic from "../components/list";

export function ProfessionalListPage() {
  const navigate = useNavigate();

  return (
    <BasePage
      title="Profissionais da Saúde"
      pageTitle="Administração"
      header={
        <HeaderList
          actions={
            <>
              <ButtonPrimitive
                variant="success"
                disabled
                onClick={() => navigate("/professionals/create")}
              >
                Adicionar
              </ButtonPrimitive>
              {/* <ButtonPrimitive variant="info">Exportar</ButtonPrimitive> */}
            </>
          }
        />
      }
    >
      <ListClinic />
    </BasePage>
  );
}
