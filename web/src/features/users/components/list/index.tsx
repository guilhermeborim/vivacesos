import { useQueryUsers } from "features/users/api/mutations";
import { TableContainer } from "shared/components";
import { columnsListClinic } from "./columns";

export default function ListUser() {
  const { dataUsers } = useQueryUsers();

  function handleEdit(clinicId: string) {}

  function handleDelete(id: string) {}

  return (
    <>
      <TableContainer
        columns={columnsListClinic({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={dataUsers || []}
        customPageSize={6}
        divClass="table-card mb-3"
        tableClass="table align-middle table-nowrap mb-0"
        theadClass="table-light"
      />
    </>
  );
}
