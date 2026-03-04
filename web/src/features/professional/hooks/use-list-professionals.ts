import { useQueryUsers } from "@/features/users/api/mutations"
import { Professional, User } from "@/shared/types"
import { useQueryProfessionals } from "../api/mutations"

export const useListProfessionals = () => {
  const { dataProfessionals } = useQueryProfessionals()
  const { dataUsers } = useQueryUsers()

  const usersNotProfessionals = dataUsers?.filter(
    (user: User) =>
      !dataProfessionals?.some((prof: Professional) => prof.userId === user.user.userId),
  )

  return {
    usersNotProfessionals,
  }
}
