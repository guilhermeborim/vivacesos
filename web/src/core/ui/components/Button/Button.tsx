import { VariantColor } from "@/shared/constants/variant";
import { useSelector } from "react-redux";
import { Button, ButtonProps } from "reactstrap";
import { ActivityIndicator } from "../Loading";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonPrimitiveProps extends ButtonProps {
  variant?: VariantColor;
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
  const theme = useSelector((state: any) => state.Layout.layoutThemeColorType);
  console.log("THEME =", theme);

  return (
    <Button
      disabled={disabled || isLoading}
      size={size}
      color={variant}
      {...props}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </Button>
  );
}
