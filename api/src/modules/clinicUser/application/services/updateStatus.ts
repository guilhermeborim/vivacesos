// api/src/modules/clinicUser/application/services/UpdateStatus.ts

import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers"
import { ALLOWED_TRANSITIONS } from "../../../../infra/web/routes/schemas/clinicUser/update-status.schema"
import { ForbiddenError } from "../../../../shared/errors/forbidden.error"
import { NotFoundError } from "../../../../shared/errors/not-found.error"
import { ProfessionalTypeormRepository } from "../../../professional/database/repositories/ProfessionalTypeormRepository"
import { ClinicUsersTypeormRepository } from "../../database/repositories/ClinicUserTypeormRepository"

export class UpdateClinicUserStatusService {
  private clinicUserRepository: ClinicUsersTypeormRepository
  private professionalRepository: ProfessionalTypeormRepository

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository()
    this.professionalRepository = new ProfessionalTypeormRepository()
  }

  async execute(
    clinicId: string,
    requestingUserId: string, // quem está fazendo a ação
    targetUserId: string, // quem vai ser afetado
    newStatus: ClinicUserStatus,
  ): Promise<void> {
    // Proteção: não pode alterar o próprio status
    if (requestingUserId === targetUserId) {
      throw new ForbiddenError("Você não pode alterar o seu próprio status!")
    }

    // Busca o vínculo atual do usuário alvo
    const clinicUser = await this.clinicUserRepository.getUserBindedClinic(
      clinicId,
      targetUserId,
    )

    if (!clinicUser) {
      throw new NotFoundError("Usuário não encontrado nesta clínica!")
    }

    // Valida se a transição de status é permitida
    const allowedNext = ALLOWED_TRANSITIONS[clinicUser.status] ?? []
    if (!allowedNext.includes(newStatus)) {
      throw new ForbiddenError(
        `Transição de status inválida: ${clinicUser.status} → ${newStatus}`,
      )
    }

    // Atualiza o status do vínculo clinic_user
    await this.clinicUserRepository.updateClinicUserStatus(
      clinicId,
      targetUserId,
      newStatus,
    )

    // Cascade: se for PROFISSIONAL, sincroniza o professional.active
    if (clinicUser.role === ClinicUserRole.PROFISSIONAL) {
      const professional = await this.professionalRepository.getProfessionalByClinicId(
        clinicId,
        targetUserId,
      )

      if (professional) {
        const shouldBeActive = newStatus === ClinicUserStatus.ATIVO
        await this.professionalRepository.updateProfessional(professional.id, {
          active: shouldBeActive,
        })
      }
    }
  }
}
