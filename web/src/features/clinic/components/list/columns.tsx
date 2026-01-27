import { textColumn } from "Components/Common/TextColumn";
import { OptionsListClinic } from "./options";

export const columnsListClinic = [
  textColumn("NOME", "name"),
  textColumn("CNPJ", "cnpj"),
  textColumn("STATUS", "status"),
  {
    header: "AÇÃO",
    disableFilters: true,
    enableSorting: false,
    cell: (cell: any) => <OptionsListClinic />,
  },
];
