import { TableList } from "core/ui/components/Table";
import { useQueryUsers } from "features/users/api/mutations";
import { createUserColumns } from "./columns";

export default function ListUser() {
  const { dataUsers } = useQueryUsers();

  const columns = createUserColumns({
    onEdit: () => console.log("editou"),
    onDelete: () => console.log("excluiu"),
  });

  return (
    <>
      <TableList.Root columns={columns} data={dataUsers || []} />
    </>
  );
}
