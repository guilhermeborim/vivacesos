import crypto from "crypto";
import { ClinicInvite } from "../../../../infra/database/typeorm/sass/entities/ClinicInvites";
import { resend } from "../../../../infra/web/config/resend";
import { ForbiddenError } from "../../../../shared/errors/forbidden.error";
import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error";
import { ClinicTypeormRepository } from "../../../clinic/database/repositories/ClinicTypeormRepository";
import { InviteTypeormRepository } from "../../database/repositories/InviteTypeormRepository";
import { CreateInviteParams } from "../types";

export class RegisterInviteService {
  private inviteRepository: InviteTypeormRepository;
  private clinicRepository: ClinicTypeormRepository;

  constructor() {
    this.inviteRepository = new InviteTypeormRepository();
    this.clinicRepository = new ClinicTypeormRepository();
  }

  async execute(
    invite: CreateInviteParams,
    clinicId: string,
  ): Promise<ClinicInvite> {
    if (!clinicId) {
      throw new UnauthenticatedError("Por favor, informe a clínica!");
    }

    const clinic = await this.clinicRepository.findById(clinicId);

    const token = crypto.randomBytes(32).toString("hex");

    const existInviteByEmail = await this.inviteRepository.getInviteByEmail(
      invite.email,
    );

    if (
      existInviteByEmail &&
      !existInviteByEmail.accepted &&
      !existInviteByEmail.acceptedAt &&
      existInviteByEmail.expiresAt > new Date()
    ) {
      throw new ForbiddenError(
        "Este e-mail já foi convidado. Aguardando o usuário aceitar o convite!",
      );
    }

    if (
      existInviteByEmail &&
      !existInviteByEmail.accepted &&
      existInviteByEmail.expiresAt < new Date()
    ) {
      console.log("deletando...");
      await this.inviteRepository.deleteInviteExpires(existInviteByEmail.id);
    }

    if (existInviteByEmail && existInviteByEmail.accepted) {
      throw new ForbiddenError(
        "Este e-mail já aceitou seu convite. Não é possível convidar novamente!",
      );
    }

    const createInvite = await this.inviteRepository.invite(
      invite,
      clinicId,
      token,
    );

    await resend.emails.send({
      from: "Vivace SOS <noreply@vivacesos.com.br>",
      to: invite.email,
      subject: "Você foi convidado para uma clínica",
      html: `
        <p>Você foi convidado para participar da clínica <b>${clinic.name}</b>.</p>

        <a href="http://localhost:5173/invite/accept?token=${token}">
          Aceitar convite
        </a>

        <p>Este convite expira em 24 horas.</p>
      `,
    });

    return createInvite;
  }
}
