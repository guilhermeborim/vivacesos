import { VariantColor } from "@/shared/constants/variant";
import { DropdownToggle, DropdownToggleProps } from "reactstrap";

interface ToggleProps extends DropdownToggleProps {
  variant?: VariantColor;
}
export function Toggle({ variant, ...props }: ToggleProps) {
  return (
    <DropdownToggle
      tag="button"
      className={`btn btn-${variant} btn-sm`}
      type="button"
      {...props}
    >
      <i className="ri-more-fill align-middle" />
    </DropdownToggle>
  );
}
