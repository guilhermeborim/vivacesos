import { Button, ButtonProps } from "reactstrap";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "info"
  | "success"
  | "warning"
  | "light";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonPrimitiveProps extends ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export function ButtonPrimitive({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonPrimitiveProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      size={size}
      color={variant}
      {...props}
    >
      {isLoading ? "Carregando..." : children}
    </Button>
  );
}
