import { useQueryUsers } from "@/features/users/api/queries"
import { ClinicUserStatus } from "@/shared/enums"
import { Professional, User } from "@/shared/types"
import { useQueryProfessionals } from "../api/queries"

export const useListProfessionals = () => {
  const { dataProfessionals } = useQueryProfessionals()
  const { dataUsers } = useQueryUsers()

  // Só usuários ativos (convites ainda não aceitos não têm `user`) e sem perfil de profissional.
  const usersNotProfessionals = dataUsers?.filter(
    (user: User) =>
      !!user.user &&
      user.status === ClinicUserStatus.ATIVO &&
      !dataProfessionals?.some((prof: Professional) => prof.userId === user.user.userId),
  )

  return {
    data: {
      usersNotProfessionals,
      dataProfessionals,
    },
  }
}
