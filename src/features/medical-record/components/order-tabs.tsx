import { ButtonPrimitive, FormModal, InputController, SelectController } from "@/core/ui"
import { MedicalRecordEntry } from "@/shared/types"
import { formatDateTime } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Col, Row } from "reactstrap"
import {
  certificateFormSchema,
  CertificateFormOutput,
  CertificateFormValues,
  referralFormSchema,
  ReferralFormOutput,
  ReferralFormValues,
  examFormSchema,
  ExamFormOutput,
  ExamFormValues,
  prescriptionFormSchema,
  PrescriptionFormOutput,
  PrescriptionFormValues,
} from "../schemas"
import { describeCertificate, describePrescription } from "../utils-items"

const UNITS = [
  "mg",
  "g",
  "mcg",
  "ml",
  "gotas",
  "comprimido(s)",
  "cápsula(s)",
  "ampola(s)",
  "UI",
  "sachê(s)",
].map((u) => ({ label: u, value: u }))

function PrescriptionModal({
  onAdd,
  onClose,
}: {
  onAdd: (item: PrescriptionFormOutput) => void
  onClose: () => void
}) {
  const form = useForm<PrescriptionFormValues, unknown, PrescriptionFormOutput>({
    resolver: zodResolver(prescriptionFormSchema),
  })
  const submit = form.handleSubmit((values) => {
    onAdd(values)
    onClose()
  })

  return (
    <FormModal
      size="lg"
      title="Adicionar prescrição"
      submitLabel="Adicionar"
      isOpen
      toggle={onClose}
      form={form}
      onSubmit={submit}
      isPending={false}
    >
      <Row className="g-3">
        <Col lg={12}>
          <InputController
            control={form.control}
            name="medication"
            label="Medicamento"
            maxLength={200}
            placeholder="Ex.: Dipirona sódica"
          />
        </Col>
        <Col md={6}>
          <InputController
            control={form.control}
            name="dose"
            label="Dose"
            maxLength={50}
            placeholder="Ex.: 500"
          />
        </Col>
        <Col md={6}>
          <SelectController control={form.control} name="unit" label="Unidade" options={UNITS} />
        </Col>
        <Col md={6}>
          <InputController
            control={form.control}
            name="frequency"
            label="Horário / frequência"
            maxLength={100}
            placeholder="Ex.: 8/8 horas"
          />
        </Col>
        <Col md={6}>
          <InputController
            control={form.control}
            name="duration"
            label="Duração"
            maxLength={100}
            placeholder="Ex.: 7 dias"
          />
        </Col>
        <Col lg={12}>
          <InputController
            control={form.control}
            name="instructions"
            label="Orientações"
            type="textarea"
            rows={2}
            maxLength={500}
            placeholder="Ex.: tomar após as refeições"
          />
        </Col>
      </Row>
    </FormModal>
  )
}

function ExamModal({
  onAdd,
  onClose,
}: {
  onAdd: (item: ExamFormOutput) => void
  onClose: () => void
}) {
  const form = useForm<ExamFormValues, unknown, ExamFormOutput>({
    resolver: zodResolver(examFormSchema),
  })
  const submit = form.handleSubmit((values) => {
    onAdd(values)
    onClose()
  })

  return (
    <FormModal
      title="Pedir exame"
      submitLabel="Adicionar"
      isOpen
      toggle={onClose}
      form={form}
      onSubmit={submit}
      isPending={false}
    >
      <Row className="g-3">
        <Col lg={12}>
          <InputController
            control={form.control}
            name="name"
            label="Exame"
            maxLength={200}
            placeholder="Ex.: Hemograma completo"
          />
        </Col>
        <Col lg={12}>
          <InputController
            control={form.control}
            name="notes"
            label="Observações"
            type="textarea"
            rows={2}
            maxLength={500}
            placeholder="Ex.: em jejum de 8 horas"
          />
        </Col>
      </Row>
    </FormModal>
  )
}

interface OrderTabProps<T> {
  /** Itens desta ficha, ainda não registrados. */
  items: T[]
  onAdd: (item: T) => void
  onRemove: (index: number) => void
  /** Fichas ativas do paciente, para o histórico. */
  history: MedicalRecordEntry[]
  /** Modal aberto (controlado pela página, que o renderiza fora do formulário da ficha). */
  adding: boolean
  setAdding: (open: boolean) => void
  /** Imprime os itens ainda não registrados desta consulta. */
  onPrint?: () => void
}

function PendingList({
  title,
  empty,
  rows,
  onRemove,
}: {
  title: string
  empty: string
  rows: { main: string; sub?: string }[]
  onRemove: (index: number) => void
}) {
  return (
    <>
      <h6 className="mb-2">{title}</h6>
      {rows.length === 0 ? (
        <p className="text-muted">{empty}</p>
      ) : (
        <ul className="list-group mb-3">
          {rows.map((row, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                {row.main}
                {row.sub && <small className="text-muted d-block">{row.sub}</small>}
              </div>
              <ButtonPrimitive size="sm" variant="danger" outline onClick={() => onRemove(i)}>
                Remover
              </ButtonPrimitive>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export function PrescriptionsTab({
  items,
  onAdd,
  onRemove,
  history,
  adding,
  setAdding,
  onPrint,
}: OrderTabProps<PrescriptionFormOutput>) {
  const past = history.filter((e) => e.prescriptions?.length)

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-muted mb-0">
            As prescrições são gravadas junto com a ficha, quando você clicar em Registrar.
          </p>
          <div className="d-flex gap-2">
            {onPrint && (
              <ButtonPrimitive variant="light" disabled={!items.length} onClick={onPrint}>
                <i className="ri-printer-line me-1" />
                Imprimir
              </ButtonPrimitive>
            )}
            <ButtonPrimitive onClick={() => setAdding(true)}>
              <i className="ri-add-line me-1" />
              Adicionar prescrição
            </ButtonPrimitive>
          </div>
        </div>
        <PendingList
          title="Desta consulta"
          empty="Nenhuma prescrição adicionada."
          rows={items.map((p) => ({ main: describePrescription(p), sub: p.instructions }))}
          onRemove={onRemove}
        />
        <h6 className="mb-2">Histórico de medicamentos do paciente</h6>
        {past.length === 0 ? (
          <p className="text-muted mb-0">Nenhuma prescrição anterior.</p>
        ) : (
          past.map((e) => (
            <div key={e.entryId} className="mb-2">
              <small className="text-muted">
                {formatDateTime(e.createdAt)} · {e.professional.name ?? "-"}
              </small>
              <ul className="mb-0 ps-3">
                {e.prescriptions.map((p) => (
                  <li key={p.itemId}>{describePrescription(p)}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </>
      {adding && <PrescriptionModal onAdd={onAdd} onClose={() => setAdding(false)} />}
    </>
  )
}

export function ExamsTab({
  items,
  onAdd,
  onRemove,
  history,
  adding,
  setAdding,
  onPrint,
}: OrderTabProps<ExamFormOutput>) {
  const past = history.filter((e) => e.exams?.length)

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-muted mb-0">
            Os pedidos são gravados junto com a ficha, quando você clicar em Registrar.
          </p>
          <div className="d-flex gap-2">
            {onPrint && (
              <ButtonPrimitive variant="light" disabled={!items.length} onClick={onPrint}>
                <i className="ri-printer-line me-1" />
                Imprimir
              </ButtonPrimitive>
            )}
            <ButtonPrimitive onClick={() => setAdding(true)}>
              <i className="ri-add-line me-1" />
              Pedir exame
            </ButtonPrimitive>
          </div>
        </div>
        <PendingList
          title="Desta consulta"
          empty="Nenhum exame pedido."
          rows={items.map((x) => ({ main: x.name, sub: x.notes }))}
          onRemove={onRemove}
        />
        <h6 className="mb-2">Histórico de exames pedidos</h6>
        {past.length === 0 ? (
          <p className="text-muted mb-0">Nenhum exame pedido antes.</p>
        ) : (
          past.map((e) => (
            <div key={e.entryId} className="mb-2">
              <small className="text-muted">
                {formatDateTime(e.createdAt)} · {e.professional.name ?? "-"}
              </small>
              <ul className="mb-0 ps-3">
                {e.exams.map((x) => (
                  <li key={x.itemId}>{x.name}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </>
      {adding && <ExamModal onAdd={onAdd} onClose={() => setAdding(false)} />}
    </>
  )
}

function CertificateModal({
  onAdd,
  onClose,
}: {
  onAdd: (item: CertificateFormOutput) => void
  onClose: () => void
}) {
  const form = useForm<CertificateFormValues, unknown, CertificateFormOutput>({
    resolver: zodResolver(certificateFormSchema),
  })
  const submit = form.handleSubmit((values) => {
    onAdd(values)
    onClose()
  })

  return (
    <FormModal
      title="Adicionar atestado"
      submitLabel="Adicionar"
      isOpen
      toggle={onClose}
      form={form}
      onSubmit={submit}
      isPending={false}
    >
      <Row className="g-3">
        <Col md={6}>
          <InputController
            control={form.control}
            name="cid"
            label="CID (opcional)"
            maxLength={10}
            placeholder="Ex.: J00"
          />
        </Col>
        <Col md={6}>
          <InputController
            control={form.control}
            name="days"
            label="Dias de afastamento"
            type="number"
            min={1}
            max={365}
            placeholder="Vazio = comparecimento"
          />
        </Col>
        <Col lg={12}>
          <InputController
            control={form.control}
            name="text"
            label="Texto do atestado"
            type="textarea"
            rows={4}
            maxLength={2000}
            placeholder="Ex.: Atesto que o paciente esteve em consulta e necessita de afastamento..."
          />
        </Col>
      </Row>
    </FormModal>
  )
}

function ReferralModal({
  onAdd,
  onClose,
}: {
  onAdd: (item: ReferralFormOutput) => void
  onClose: () => void
}) {
  const form = useForm<ReferralFormValues, unknown, ReferralFormOutput>({
    resolver: zodResolver(referralFormSchema),
  })
  const submit = form.handleSubmit((values) => {
    onAdd(values)
    onClose()
  })

  return (
    <FormModal
      title="Adicionar encaminhamento"
      submitLabel="Adicionar"
      isOpen
      toggle={onClose}
      form={form}
      onSubmit={submit}
      isPending={false}
    >
      <Row className="g-3">
        <Col lg={12}>
          <InputController
            control={form.control}
            name="specialty"
            label="Especialidade"
            maxLength={100}
            placeholder="Ex.: Cardiologia"
          />
        </Col>
        <Col lg={12}>
          <InputController
            control={form.control}
            name="reason"
            label="Motivo / observações"
            type="textarea"
            rows={3}
            maxLength={1000}
          />
        </Col>
      </Row>
    </FormModal>
  )
}

export function CertificatesTab({
  items,
  onAdd,
  onRemove,
  history,
  adding,
  setAdding,
  onPrint,
}: OrderTabProps<CertificateFormOutput>) {
  const past = history.filter((e) => e.certificates?.length)

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">Gravados junto com a ficha, ao clicar em Registrar.</p>
        <div className="d-flex gap-2">
          {onPrint && (
            <ButtonPrimitive variant="light" disabled={!items.length} onClick={onPrint}>
              <i className="ri-printer-line me-1" />
              Imprimir
            </ButtonPrimitive>
          )}
          <ButtonPrimitive onClick={() => setAdding(true)}>
            <i className="ri-add-line me-1" />
            Adicionar atestado
          </ButtonPrimitive>
        </div>
      </div>
      <PendingList
        title="Desta consulta"
        empty="Nenhum atestado adicionado."
        rows={items.map((c) => ({
          main: `${describeCertificate(c)}${c.cid ? ` · CID ${c.cid}` : ""}`,
          sub: c.text,
        }))}
        onRemove={onRemove}
      />
      <h6 className="mb-2">Atestados anteriores</h6>
      {past.length === 0 ? (
        <p className="text-muted mb-0">Nenhum atestado anterior.</p>
      ) : (
        past.map((e) => (
          <div key={e.entryId} className="mb-2">
            <small className="text-muted">
              {formatDateTime(e.createdAt)} · {e.professional.name ?? "-"}
            </small>
            <ul className="mb-0 ps-3">
              {e.certificates.map((c) => (
                <li key={c.itemId}>{describeCertificate(c)}</li>
              ))}
            </ul>
          </div>
        ))
      )}
      {adding && <CertificateModal onAdd={onAdd} onClose={() => setAdding(false)} />}
    </>
  )
}

export function ReferralsTab({
  items,
  onAdd,
  onRemove,
  history,
  adding,
  setAdding,
  onPrint,
}: OrderTabProps<ReferralFormOutput>) {
  const past = history.filter((e) => e.referrals?.length)

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">Gravados junto com a ficha, ao clicar em Registrar.</p>
        <div className="d-flex gap-2">
          {onPrint && (
            <ButtonPrimitive variant="light" disabled={!items.length} onClick={onPrint}>
              <i className="ri-printer-line me-1" />
              Imprimir
            </ButtonPrimitive>
          )}
          <ButtonPrimitive onClick={() => setAdding(true)}>
            <i className="ri-add-line me-1" />
            Adicionar encaminhamento
          </ButtonPrimitive>
        </div>
      </div>
      <PendingList
        title="Desta consulta"
        empty="Nenhum encaminhamento adicionado."
        rows={items.map((r) => ({ main: r.specialty, sub: r.reason }))}
        onRemove={onRemove}
      />
      <h6 className="mb-2">Encaminhamentos anteriores</h6>
      {past.length === 0 ? (
        <p className="text-muted mb-0">Nenhum encaminhamento anterior.</p>
      ) : (
        past.map((e) => (
          <div key={e.entryId} className="mb-2">
            <small className="text-muted">
              {formatDateTime(e.createdAt)} · {e.professional.name ?? "-"}
            </small>
            <ul className="mb-0 ps-3">
              {e.referrals.map((r) => (
                <li key={r.itemId}>{r.specialty}</li>
              ))}
            </ul>
          </div>
        ))
      )}
      {adding && <ReferralModal onAdd={onAdd} onClose={() => setAdding(false)} />}
    </>
  )
}
