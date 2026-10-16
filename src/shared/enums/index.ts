export enum Type {
  MEDICO = "MEDICO",
}

export enum Role {
  ADMIN = "ADMIN",
  PROFISSIONAL = "PROFISSIONAL",
  RECEPCIONISTA = "RECEPCIONISTA",
}

export enum ClinicUserStatus {
  INVITADO = "INVITADO",
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
  BLOQUEADO = "BLOQUEADO",
}

export enum AppointmentStatus {
  AGENDADA = "AGENDADA",
  CONFIRMADA = "CONFIRMADA",
  CONCLUIDA = "CONCLUIDA",
  CANCELADA = "CANCELADA",
  FALTOU = "FALTOU",
}

export enum PaymentMethod {
  PIX = "PIX",
  CARTAO = "CARTAO",
  DINHEIRO = "DINHEIRO",
}
