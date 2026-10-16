import { ButtonPrimitive, ModalComponent, SelectController } from "@/core/ui"
import { useSelectClinic } from "@/features/clinic/hooks/use-select-clinic"
import { ClinicAuthContext } from "@/shared/types"
import ImgSelect from "../../../assets/images/select.svg"

export interface ModalSelectClinicProps {
  clinics: ClinicAuthContext[]
  isOpen: boolean
}

export function ModalSelectClinic({ clinics, isOpen }: ModalSelectClinicProps) {
  const {
    actions: { formSelectClinic, handleSubmitSelectClinic },
    isLoading: { isPending },
  } = useSelectClinic()

  return (
    <ModalComponent.Root isOpen={isOpen} toggle={() => {}}>
      <ModalComponent.Body>
        <div className="my-2 text-center">
          <img src={ImgSelect} alt="Seleção de Clínica" height="100" className="mb-3" />
          <div className="fs-15 mx-4 mx-sm-5">
            <h4>Escolha a clínica para continuar</h4>
            <p className="text-muted mb-0">
              Você faz parte de mais de uma clínica. Para garantir que as informações,
              atendimentos e permissões estejam corretos, selecione abaixo a clínica em
              que deseja trabalhar agora.
            </p>
          </div>
        </div>

        <SelectController
          label="Selecione a Clínica"
          options={
            clinics?.map((clinic) => ({
              label: clinic.name,
              value: clinic.clinicId,
            })) ?? []
          }
          control={formSelectClinic.control}
          name={"clinicId"}
        />
        <div className="d-grid mt-4 mb-2">
          <form onSubmit={handleSubmitSelectClinic}>
            <ButtonPrimitive
              type="submit"
              variant="primary"
              disabled={!formSelectClinic.formState.isValid || isPending}
              isLoading={isPending}
            >
              Selecionar Clínica
            </ButtonPrimitive>
          </form>
        </div>
      </ModalComponent.Body>
    </ModalComponent.Root>
  )
}
