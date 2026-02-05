import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "danger" | "default";
}

export interface ActionsDropdownProps {
  actions: ActionItem[];
}

export function ActionsDropdown({ actions }: ActionsDropdownProps) {
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        tag="button"
        className="btn btn-soft-info btn-sm"
        type="button"
      >
        <i className="ri-more-fill align-middle" />
      </DropdownToggle>

      <DropdownMenu end container="body">
        {actions.map((action, index) => (
          <DropdownItem
            key={index}
            onClick={action.onClick}
            className={action.variant === "danger" ? "text-danger" : ""}
          >
            {action.icon}
            {action.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
