import { TableList } from "@/core/ui/components/Table"
import { useListPatients } from "../../hooks"
import { createPatientColumns } from "./columns"

export function ListPatient() {
  const {
    data: { dataPatients },
  } = useListPatients()
  const columns = createPatientColumns({
    onEdit: () => console.log("editou"),
    onDelete: () => console.log("excluiu"),
  })

  return (
    <>
      <TableList.Root columns={columns} data={dataPatients || []} />
    </>
  )
}
