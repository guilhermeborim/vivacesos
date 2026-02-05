import { ButtonPrimitive, ModalBase } from "core/ui";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  icon?: React.ReactNode;
  confirmText: string;
  confirmVariant?: "danger" | "primary" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  icon,
  confirmText,
  confirmVariant = "primary",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <ModalBase isOpen={isOpen} toggle={onCancel}>
      <div className="text-center p-3">
        {icon && <div className="mb-3">{icon}</div>}

        <h4>{title}</h4>
        <p className="text-muted">{description}</p>

        <div className="d-flex justify-content-center gap-2 mt-4">
          <ButtonPrimitive variant="light" onClick={onCancel}>
            Cancelar
          </ButtonPrimitive>
          <ButtonPrimitive variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </ButtonPrimitive>
        </div>
      </div>
    </ModalBase>
  );
}
