import { VariantColor } from "@/shared/constants/variant";
import { DropdownItem, DropdownItemProps } from "reactstrap";

interface ItemProps extends DropdownItemProps {
  icon: React.ReactElement;
  label: string;
  variant?: VariantColor | null;
}

export function Item({ icon, variant = null, label, ...props }: ItemProps) {
  return (
    <DropdownItem
      {...props}
      className={`${variant !== null && `text-${variant}`}`}
    >
      {icon}
      {label}
    </DropdownItem>
  );
}
