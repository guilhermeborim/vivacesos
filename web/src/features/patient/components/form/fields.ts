import { Path } from "react-hook-form";
import { CreatePatientTypeSchema } from "../../schemas";

type FieldConfig = {
  name: Path<CreatePatientTypeSchema>;
  label: string;
  placeholder?: string;
  md?: number | string;
  type?: React.HTMLInputTypeAttribute | any;
  mask?: string;
};

export const fields: FieldConfig[] = [
  {
    name: "name",
    label: "Nome",
    placeholder: "Nome completo",
    md: 3,
    type: "text",
  },
  {
    name: "email",
    label: "E-mail",
    placeholder: "example@example.com",
    md: 3,
    type: "text",
  },
  {
    name: "cpf",
    label: "CPF",
    placeholder: "000.000.000-00",
    md: 3,
    type: "text",
    mask: "999.999.999-99",
  },
  {
    name: "phone",
    label: "Telefone",
    placeholder: "(00) 00000-0000",
    md: 3,
    type: "text",
    mask: "(99) 99999-9999",
  },
  {
    name: "birthDate",
    label: "Nascimento",
    md: 3,
    type: "date",
  },
] as const;
