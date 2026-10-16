import { FormModal, Loading } from "@/core/ui"
import { PaymentModal } from "@/features/finance/components/payment-modal"
import { toPaymentPayload } from "@/features/finance/utils"
import { useAuth } from "@/shared/hooks"
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
  const billingOnly = edit.appointment?.appointment.status === AppointmentStatus.CONCLUIDA
  const columns = appointmentColumns({
    onEdit: edit.openEdit,
    onChangeStatus: (appointmentId, status) =>
      mutationStatus.mutate({ appointmentId, status }),
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
