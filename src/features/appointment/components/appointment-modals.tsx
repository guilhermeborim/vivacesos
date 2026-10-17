import { ButtonPrimitive, FormModal, ModalComponent } from "@/core/ui"
import { PaymentModal } from "@/features/finance/components/payment-modal"
import { toPaymentPayload } from "@/features/finance/utils"
import { AppointmentStatus } from "@/shared/enums"
import { formatDateTime } from "@/shared/utils"
import { AppointmentActions } from "../hooks/use-appointment-actions"
import { FormAppointment } from "./form/form"

/** Modais das ações de uma consulta (editar, pagar, concluir sem ficha, cancelar, faltou). */
export function AppointmentModals({ actions }: { actions: AppointmentActions }) {
  const {
    edit,
    billingOnly,
    mutationStatus,
    mutationPayment,
    paying,
    setPaying,
    concluding,
    setConcluding,
    confirming,
    setConfirming,
  } = actions

  const isCancel = confirming?.status === AppointmentStatus.CANCELADA

  return (
    <>

      {edit.modalOpen && edit.appointment && (
        <FormModal
          mode="edit"
          size="lg"
          title={billingOnly ? "Valor da consulta" : "Atualize os dados da consulta"}
          submitLabel="Atualizar"
          isOpen={edit.modalOpen}
          toggle={edit.toggleModal}
          form={edit.form}
          onSubmit={edit.handleSubmitUpdate}
          isPending={edit.isPending}
        >
          <FormAppointment defaultValues={edit.appointment} isEdit billingOnly={billingOnly} />
        </FormModal>
      )}

      {confirming && (
        <ModalComponent.Root isOpen toggle={() => setConfirming(null)} size="sm">
          <ModalComponent.Body>
            <div className="text-center py-2">
              <div
                className={`avatar-lg mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center bg-${
                  isCancel ? "danger" : "warning"
                }-subtle text-${isCancel ? "danger" : "warning"}`}
                style={{ width: 72, height: 72 }}
              >
                <i
                  className={`${isCancel ? "ri-calendar-close-line" : "ri-user-unfollow-line"} fs-1`}
                />
              </div>
              <h5 className="mb-2">{isCancel ? "Cancelar esta consulta?" : "Marcar falta?"}</h5>
              <p className="mb-1">
                <strong>{confirming.appointment.patient.name}</strong>
              </p>
              <p className="text-muted mb-3">{formatDateTime(confirming.appointment.startsAt)}</p>
              <p className="text-muted fs-13 mb-0">
                {isCancel
                  ? "O horário ficará livre na agenda para um novo agendamento."
                  : "O paciente não compareceu. O horário ficará livre na agenda."}
              </p>
            </div>
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive variant="light" onClick={() => setConfirming(null)}>
              Voltar
            </ButtonPrimitive>
            <ButtonPrimitive
              variant={isCancel ? "danger" : "warning"}
              isLoading={mutationStatus.isPending}
              onClick={() =>
                mutationStatus.mutate(
                  {
                    appointmentId: confirming.appointment.appointmentId,
                    status: confirming.status,
                  },
                  { onSettled: () => setConfirming(null) },
                )
              }
            >
              {isCancel ? "Cancelar consulta" : "Marcar falta"}
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}

      {concluding && (
        <ModalComponent.Root isOpen toggle={() => setConcluding(null)}>
          <ModalComponent.Body>
            <h5>Esta consulta não tem ficha no prontuário</h5>
            <p>
              Depois de <strong>CONCLUÍDA</strong>, não será mais possível criar a ficha desta
              consulta (só consultas confirmadas ou com o paciente presente recebem ficha). Deseja
              concluir mesmo assim?
            </p>
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive variant="light" onClick={() => setConcluding(null)}>
              Voltar
            </ButtonPrimitive>
            <ButtonPrimitive
              variant="warning"
              isLoading={mutationStatus.isPending}
              onClick={() => {
                mutationStatus.mutate(
                  { appointmentId: concluding, status: AppointmentStatus.CONCLUIDA },
                  { onSettled: () => setConcluding(null) },
                )
              }}
            >
              Concluir mesmo assim
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}

      {paying && (
        <PaymentModal
          isOpen
          toggle={() => setPaying(null)}
          title="Pagamento da consulta"
          initial={{ paid: paying.paid, paymentMethod: paying.paymentMethod }}
          onSubmit={(payload) =>
            mutationPayment.mutateAsync({
              appointmentId: paying.appointmentId,
              ...toPaymentPayload(payload),
            })
          }
          isPending={mutationPayment.isPending}
        />
      )}
    </>
  )
}
