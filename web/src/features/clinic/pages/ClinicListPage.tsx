import { ButtonPrimitive } from "core/ui";
import { HeaderList } from "shared/components";
import { BasePage } from "shared/components/BasePage";
import ListClinic from "../components/list";

export function ClinicListPage() {
  return (
    <BasePage
      title="Clínicas"
      pageTitle="Administração"
      header={
        <HeaderList
          actions={
            <>
              <ButtonPrimitive variant="success">Adicionar</ButtonPrimitive>
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
