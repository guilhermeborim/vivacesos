import { ButtonPrimitive, ModalBase } from "core/ui";

interface ModalListProps {
  isOpen: boolean;
  title: string;
  description: string;
  icon?: React.ReactNode;
  confirmText: string;
  confirmVariant?: "danger" | "primary" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ModalListProps({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}: ModalListProps) {
  return (
    <ModalBase isOpen={isOpen} toggle={onCancel} footer={<ButtonPrimitive />}>
      <div className="text-center p-3">
        {title && <p className="text-muted">{description}</p>}
        {description && <p className="text-muted">{description}</p>}
      </div>
    </ModalBase>
  );
}
