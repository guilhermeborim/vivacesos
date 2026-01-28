import { ConfirmModal } from "core/ui";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  entityName?: string;
}

export function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  entityName = "este registro",
}: DeleteConfirmModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Atenção!"
      description={`Tem certeza que deseja excluir ${entityName}? Essa ação não poderá ser desfeita.`}
      confirmText="Excluir"
      confirmVariant="danger"
      onConfirm={onConfirm}
      onCancel={onCancel}
      icon={<i className="ri-delete-bin-line fs-1 text-danger" />}
    />
  );
}
