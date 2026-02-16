import { ButtonPrimitive, ModalComponent, SelectController } from "@/core/ui";
import { useSelectClinic, UseSelectClinicProps } from "@/shared/hooks";
import ImgSelect from "../../../assets/images/select.svg";

export function ModalSelectClinic({
  clinics,
  isOpen,
  onClose,
}: UseSelectClinicProps) {
  const { form, mutationSelectClinic, onSubmitSelectClinic } = useSelectClinic({
    clinics,
    isOpen,
    onClose,
  });

  return (
    <ModalComponent.Root isOpen={isOpen} toggle={() => {}}>
      <ModalComponent.Body
      // className="py-3 px-5"
      >
        <div className="my-2 text-center">
          <img
            src={ImgSelect}
            alt="Seleção de Clínica"
            height="100"
            className="mb-3"
          />
          <div className="fs-15 mx-4 mx-sm-5">
            <h4>Escolha a clínica para continuar</h4>
            <p className="text-muted mb-0">
              Você faz parte de mais de uma clínica. Para garantir que as
              informações, atendimentos e permissões estejam corretos, selecione
              abaixo a clínica em que deseja trabalhar agora.
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmitSelectClinic)}>
          <SelectController
            label="Selecione a Clínica"
            options={
              clinics?.map((clinic) => ({
                label: clinic.name,
                value: clinic.clinicId,
              })) ?? []
            }
            control={form.control}
            name={"clinicId"}
          />
          <div className="d-grid mt-4 mb-2">
            <ButtonPrimitive
              type="submit"
              variant="primary"
              disabled={!form.watch("clinicId")}
              isLoading={mutationSelectClinic.isPending}
            >
              Selecionar Clínica
            </ButtonPrimitive>
          </div>
        </form>
      </ModalComponent.Body>
    </ModalComponent.Root>
  );
}
