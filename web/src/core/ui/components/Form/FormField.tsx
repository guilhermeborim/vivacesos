import { FormFeedback, Label } from "reactstrap";

interface FormFieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      {label && <Label className="form-label">{label}</Label>}
      {children}
      {error && <FormFeedback className="d-block ">{error}</FormFeedback>}
    </div>
  );
}
