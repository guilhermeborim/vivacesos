import { ActionsDropdown } from "core/ui";

interface ProfessionalActionsDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ProfessionalActionsDropdown({
  onEdit,
  onDelete,
}: ProfessionalActionsDropdownProps) {
  return (
    <ActionsDropdown
      actions={[
        {
          label: "Editar",
          icon: <i className="mdi mdi-pencil-outline me-1" />,
          onClick: onEdit,
        },
        // {
        //   label: "Desativar",
        //   icon: <i className="mdi mdi-delete-outline me-1" />,
        //   onClick: onDelete,
        //   variant: "danger",
        // },
      ]}
    />
  );
}
