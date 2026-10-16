import { ButtonPrimitive, FormModal, Loading, ModalComponent } from "@/core/ui"
import { PaymentModal } from "@/features/finance/components/payment-modal"
import { toPaymentPayload } from "@/features/finance/utils"
import { postAppointmentMessage } from "@/features/integrations/api/routes"
import { getAppointmentEntryStatus } from "@/features/medical-record/api/routes"
import { useAuth } from "@/shared/hooks"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { Appointment } from "@/shared/types"
import { useState } from "react"
import { TableList } from "@/core/ui/components/Table"
import { AppointmentStatus } from "@/shared/enums"
import {
  useMutationAppointmentPayment,
  useMutationUpdateAppointmentStatus,
} from "../../api/mutations"
import { useQueryAppointments } from "../../api/queries"
import { useEditAppointment } from "../../hooks/use-edit-appointment"
import { FormAppointment } from "../form/form"
import { appointmentColumns } from "./columns"

export function ListAppointment() {
  const { dataAppointments } = useQueryAppointments()
  const edit = useEditAppointment()
  const mutationStatus = useMutationUpdateAppointmentStatus()
  const mutationPayment = useMutationAppointmentPayment()
  const { hasPermission } = useAuth()
  const [paying, setPaying] = useState<Appointment | null>(null)
  const [concluding, setConcluding] = useState<string | null>(null)
  const canViewRecords = hasPermission("RECORD_VIEW")

  // Abre a aba antes da chamada (senão o navegador bloqueia o pop-up) e depois aponta para o wa.me.
  const sendWhatsapp = async (appointmentId: string) => {
    const tab = window.open("", "_blank")
    try {
      const { data } = await postAppointmentMessage(appointmentId)
      if (tab) tab.location.href = data.whatsappUrl
      else window.location.href = data.whatsappUrl
    } catch (error) {
      tab?.close()
      toast.error(
        error instanceof AxiosError
          ? (error.response?.data?.message ?? "Erro ao montar a mensagem")
          : "Erro ao montar a mensagem",
      )
    }
  }

  // Ao concluir, avisa se a consulta ainda não tem ficha no prontuário.
  const changeStatus = async (appointmentId: string, status: AppointmentStatus) => {
    if (status === AppointmentStatus.CONCLUIDA && canViewRecords) {
      try {
        const { data } = await getAppointmentEntryStatus(appointmentId)
        if (!data.hasActiveEntry) {
          setConcluding(appointmentId)
          return
        }
      } catch {
        // Sem como verificar a ficha: segue com a conclusão normal
      }
    }
    mutationStatus.mutate({ appointmentId, status })
  }
  const billingOnly = edit.appointment?.appointment.status === AppointmentStatus.CONCLUIDA
  const columns = appointmentColumns({
    onEdit: edit.openEdit,
    onChangeStatus: changeStatus,
    onWhatsapp: sendWhatsapp,
    onPayment: hasPermission("FINANCE_MANAGE") ? setPaying : undefined,
  })

  return (
    <>
      {edit.loadingAppointmentById && <Loading loading={edit.loadingAppointmentById} />}
      <TableList.Root columns={columns} data={dataAppointments || []} />

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

      {concluding && (
        <ModalComponent.Root isOpen toggle={() => setConcluding(null)}>
          <ModalComponent.Body>
            <h5>Esta consulta não tem ficha no prontuário</h5>
            <p>
              Depois de <strong>CONCLUÍDA</strong>, não será mais possível criar a ficha desta consulta
              (só consultas confirmadas recebem ficha). Deseja concluir mesmo assim?
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
          initial={{
            paid: paying.appointment.paid,
            paymentMethod: paying.appointment.paymentMethod,
          }}
          onSubmit={(payload) =>
            mutationPayment.mutateAsync({
              appointmentId: paying.appointment.appointmentId,
              ...toPaymentPayload(payload),
            })
          }
          isPending={mutationPayment.isPending}
        />
      )}
    </>
  )
}
