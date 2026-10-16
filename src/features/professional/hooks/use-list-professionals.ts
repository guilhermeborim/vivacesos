import { useQueryUsers } from "@/features/users/api/queries"
import { Professional, User } from "@/shared/types"
import { useQueryProfessionals } from "../api/queries"

export const useListProfessionals = () => {
  const { dataProfessionals } = useQueryProfessionals()
  const { dataUsers } = useQueryUsers()

  const usersNotProfessionals = dataUsers?.filter(
    (user: User) =>
      !dataProfessionals?.some((prof: Professional) => prof.userId === user.user.userId),
  )

  return {
    data: {
      usersNotProfessionals,
      dataProfessionals,
    },
  }
}
