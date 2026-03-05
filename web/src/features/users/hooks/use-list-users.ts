import { useQueryUsers } from "@/shared/queries/users"

export const useListUsers = () => {
  const { dataUsers } = useQueryUsers()

  return {
    data: {
      dataUsers,
    },
  }
}
