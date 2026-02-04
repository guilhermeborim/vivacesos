import { ButtonPrimitive } from "core/ui";
import { BasePage } from "shared/components";
import { useCreateClinic } from "shared/hooks";
import FormClinic from "../components/form";

export function ClinicCreatePage() {
  const { formCreateClinic, onSubmitClinicCreate, mutationCreateClinic } =
    useCreateClinic();

  return (
    <BasePage
      title="Cadastrar Clínica"
      pageTitle="Administração"
      footer={
        <form onSubmit={formCreateClinic.handleSubmit(onSubmitClinicCreate)}>
          <div className="d-flex justify-content-end">
            <ButtonPrimitive
              type="submit"
              variant="success"
              disabled={mutationCreateClinic.isPending}
              isLoading={mutationCreateClinic.isPending}
            >
              Salvar
            </ButtonPrimitive>
          </div>
        </form>
      }
    >
      <FormClinic formClinic={formCreateClinic} />
    </BasePage>
  );
}
