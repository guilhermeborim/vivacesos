import { BaseLayout, ButtonPrimitive, FormModal, InfoRules } from "@/core/ui"
import { useFormModal } from "@/shared/hooks"
import { useMutationAppointment } from "../api/mutations"
import { FormAppointment } from "../components/form/form"
import { ListAppointment } from "../components/list/list"
import { createAppointmentSchema, CreateAppointmentTypeSchema } from "../schemas"

export function AppointmentListPage() {
  const mutation = useMutationAppointment()
  const create = useFormModal<CreateAppointmentTypeSchema>(
    createAppointmentSchema,
    mutation.mutateAsync,
  )

  return (
    <>
      <BaseLayout.Root title="Consultas" pageTitle="Recepção">
        <BaseLayout.Header>
          <ButtonPrimitive variant="primary" onClick={create.toggleModal}>
            Agendar
          </ButtonPrimitive>
        </BaseLayout.Header>
        <BaseLayout.Body>
          <>
            <InfoRules
              rules={[
                "Status: Agendada, Confirmada, Concluída, Cancelada e Faltou.",
                "Só consultas Agendadas ou Confirmadas podem ser reagendadas ou editadas. Em uma Concluída só dá para alterar o valor; Canceladas e Faltas não têm ações.",
                "O valor da consulta não significa que foi pago: o pagamento é feito na ação “Pagamento”.",
                "Um profissional não pode ter duas consultas em aberto no mesmo horário.",
                "“Enviar no WhatsApp” abre o WhatsApp com a mensagem pronta e o link para o paciente confirmar ou cancelar; o status muda sozinho e a equipe é avisada pelo sino.",
                "Se o profissional definiu seus horários de atendimento (Configurações → Minha agenda), o agendamento mostra só as datas e horas livres dele; fora disso o sistema não permite marcar.",
                <>
                  A ficha do prontuário só pode ser criada com a consulta{" "}
                  <strong>confirmada</strong>. Ao concluir uma consulta sem ficha, o sistema avisa
                  antes.
                </>,
              ]}
            />
            <ListAppointment />
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>

      {create.modalOpen && (
        <FormModal
          size="lg"
          title="Agendar consulta"
          submitLabel="Agendar"
          isOpen={create.modalOpen}
          toggle={create.toggleModal}
          form={create.form}
          onSubmit={create.handleSubmit}
          isPending={mutation.isPending}
        >
          <FormAppointment />
        </FormModal>
      )}
    </>
  )
}
