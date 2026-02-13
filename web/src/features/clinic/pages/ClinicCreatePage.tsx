import { BaseLayout, ButtonPrimitive } from "@/core/ui";
import { useCreateClinic } from "@/shared/hooks";
import FormClinic from "../components/form";

export function ClinicCreatePage() {
  const { formCreateClinic, onSubmitClinicCreate, mutationCreateClinic } =
    useCreateClinic();

  return (
    <BaseLayout.Root title="Cadastrar Clínica" pageTitle="Administração">
      <BaseLayout.Body>
        <FormClinic formClinic={formCreateClinic} />
      </BaseLayout.Body>
      <BaseLayout.Footer>
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
      </BaseLayout.Footer>
    </BaseLayout.Root>
  );
}
