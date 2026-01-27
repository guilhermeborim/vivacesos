import TableContainer from "Components/Common/TableContainer";
import { columnsListClinic } from "./columns";

export default function ListClinic() {
  const DATA = [
    {
      id: 1,
      name: "Clínica Borim",
      cnpj: "12.345.678/0001-99",
      status: "Active",
    },
    {
      id: 2,
      name: "Clínica Secundária",
      cnpj: "98.765.432/0001-11",
      status: "Disabled",
    },
  ];

  return (
    <TableContainer
      columns={columnsListClinic}
      data={DATA || []}
      customPageSize={6}
      divClass="table-card mb-3"
      tableClass="table align-middle table-nowrap mb-0"
      theadClass="table-light"
    />
  );
}
