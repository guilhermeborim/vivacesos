import {
  BaseLayout,
  ButtonPrimitive,
  DropdownComponent,
  FormModal,
  InfoRules,
  ModalComponent,
  TableList,
} from "@/core/ui"
import { useAuth, useFormModal, useMyProfessional } from "@/shared/hooks"
import { RecordTemplate } from "@/shared/types"
import { formatDateTime } from "@/shared/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import {
  useMutationDeleteTemplate,
  useMutationTemplate,
  useMutationUpdateTemplate,
} from "../api/mutations"
import { useQueryRecordTemplates } from "../api/queries"
import { TemplateForm } from "../components/template-form"
import { templateSchema, TemplateTypeSchema } from "../schemas"

export function RecordTemplatesPage() {
  const { hasPermission } = useAuth()
  const { isProfessional, isLoading: loadingProfessional } = useMyProfessional()
  const { templates } = useQueryRecordTemplates()
  const [editing, setEditing] = useState<RecordTemplate | null>(null)
  const [removing, setRemoving] = useState<RecordTemplate | null>(null)

  const mutationCreate = useMutationTemplate()
  const create = useFormModal<TemplateTypeSchema>(templateSchema, mutationCreate.mutateAsync)

  const mutationUpdate = useMutationUpdateTemplate(editing?.templateId ?? "")
  const editForm = useForm<TemplateTypeSchema>({
    resolver: zodResolver(templateSchema),
  })
  const closeEdit = () => {
    setEditing(null)
    editForm.reset()
  }
  const submitEdit = editForm.handleSubmit(async (payload) => {
    try {
      await mutationUpdate.mutateAsync(payload)
      closeEdit()
    } catch {
      // Erro já tratado no onError da mutation
    }
  })
  const openEdit = (template: RecordTemplate) => {
    editForm.reset({ name: template.name, content: template.content })
    setEditing(template)
  }

  const mutationDelete = useMutationDeleteTemplate(removing?.templateId ?? "")

  const columns = useMemo(
    () =>
      TableList.Columns<RecordTemplate>({
        columns: [
          TableList.Column<RecordTemplate>({
            header: "Nome",
            accessorFn: (row) => row.name,
            filterType: "text",
          }),
          TableList.Column<RecordTemplate>({
            header: "Atualizado em",
            accessorFn: (row) => formatDateTime(row.updatedAt),
          }),
        ],
        renderActions: (row) => (
          <>
            <DropdownComponent.Item
              label="Editar"
              icon={<i className="mdi mdi-pencil-outline me-1" />}
              onClick={() => openEdit(row)}
            />
            <DropdownComponent.Item
              label="Remover"
              variant="danger"
              icon={<i className="mdi mdi-eye-off-outline me-1" />}
              onClick={() => setRemoving(row)}
            />
          </>
        ),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Modelos são de quem atende: ADMIN sem perfil de profissional não acessa.
  if (!hasPermission("RECORD_WRITE") || (!loadingProfessional && !isProfessional)) {
    return <Navigate to="/error-403" />
  }

  return (
    <>
      <BaseLayout.Root title="Modelos de Ficha" pageTitle="Configurações">
        <BaseLayout.Header>
          <ButtonPrimitive variant="primary" onClick={create.toggleModal}>
            Novo modelo
          </ButtonPrimitive>
        </BaseLayout.Header>
        <BaseLayout.Body>
          <>
            <InfoRules
              rules={[
                "Os modelos são seus: nenhum outro profissional vê ou altera.",
                "Ao criar uma ficha, o modelo escolhido é copiado como texto inicial e você pode editar antes de registrar.",
                "Alterar ou remover um modelo não muda as fichas que já foram criadas.",
                <>
                  Nas variáveis <strong>{"{{paciente}}"}</strong>,{" "}
                  <strong>{"{{profissional}}"}</strong> e <strong>{"{{data}}"}</strong>, o sistema
                  preenche o valor correto ao usar o modelo.
                </>,
                "Cada modelo precisa de um nome diferente.",
              ]}
            />
            <TableList.Root columns={columns} data={templates || []} />
          </>
        </BaseLayout.Body>
      </BaseLayout.Root>

      {create.modalOpen && (
        <FormModal
          size="lg"
          title="Novo modelo de ficha"
          submitLabel="Criar"
          isOpen={create.modalOpen}
          toggle={create.toggleModal}
          form={create.form}
          onSubmit={create.handleSubmit}
          isPending={mutationCreate.isPending}
        >
          <TemplateForm />
        </FormModal>
      )}

      {editing && (
        <FormModal
          mode="edit"
          size="lg"
          title="Atualize o modelo"
          submitLabel="Atualizar"
          isOpen
          toggle={closeEdit}
          form={editForm}
          onSubmit={submitEdit}
          isPending={mutationUpdate.isPending}
        >
          <TemplateForm />
        </FormModal>
      )}

      {removing && (
        <ModalComponent.Root isOpen toggle={() => setRemoving(null)}>
          <ModalComponent.Body>
            <h5>Tem certeza que deseja remover este modelo?</h5>
            <p>
              Você está prestes a <strong>REMOVER</strong> o modelo <strong>{removing.name}</strong>
              . As fichas já criadas com ele não são afetadas.
            </p>
          </ModalComponent.Body>
          <ModalComponent.Footer>
            <ButtonPrimitive
              variant="danger"
              isLoading={mutationDelete.isPending}
              onClick={async () => {
                try {
                  await mutationDelete.mutateAsync()
                  setRemoving(null)
                } catch {
                  // Erro já tratado no onError da mutation
                }
              }}
            >
              Remover
            </ButtonPrimitive>
          </ModalComponent.Footer>
        </ModalComponent.Root>
      )}
    </>
  )
}
