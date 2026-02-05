import { useQueryUsers } from "features/users/api/mutations";
import { useState } from "react";
import { TableContainer } from "shared/components";
import { columnsListClinic } from "./columns";

export default function ListUser() {
  const { dataUsers } = useQueryUsers();
  const [modalOpen, setModalOpen] = useState(false);

  function handleEdit(clinicId: string) {
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    console.log("Deletar clínica", id);
  }

  return (
    <>
      <TableContainer
        columns={columnsListClinic({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={dataUsers?.data || []}
        customPageSize={6}
        divClass="table-card mb-3"
        tableClass="table align-middle table-nowrap mb-0"
        theadClass="table-light"
      />
    </>
  );
}
