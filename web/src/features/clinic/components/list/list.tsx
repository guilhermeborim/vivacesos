import { TableList } from "@/core/ui/components/Table"
import { useListClinics } from "../../hooks"
import { clinicColumns } from "./columns"

export function ListClinic() {
  const {
    data: { dataClinics },
  } = useListClinics()

  const columns = clinicColumns({
    onEdit: () => console.log("editou"),
    onDelete: () => console.log("excluiu"),
  })

  return (
    <>
      <TableList.Root columns={columns} data={dataClinics || []} />
    </>
  )
}
