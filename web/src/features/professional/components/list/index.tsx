import { TableContainer } from "shared/components";
import { columnsListProfessional } from "./columns";

export default function ListProfessional(data: any) {
  function handleEdit(professionalId: string) {}

  function handleDelete(id: string) {
    console.log("Deletar clínica", id);
  }

  return (
    <>
      <TableContainer
        columns={columnsListProfessional({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={data?.data || []}
        customPageSize={6}
        divClass="table-card mb-3"
        tableClass="table align-middle table-nowrap mb-0"
        theadClass="table-light"
      />
    </>
  );
}
