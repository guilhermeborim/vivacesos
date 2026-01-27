import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Clinic } from "./Clinic";
import { User } from "./User";

export enum ClinicUserRole {
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

@Entity("clinic_users")
@Unique(["userId", "clinicId"])
export class ClinicUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "userId", type: "uuid", nullable: false })
  userId: string;

  @Column({ name: "clinicId", type: "uuid", nullable: false })
  clinicId: string;

  @Column({
    name: "role",
    type: "enum",
    enum: ClinicUserRole,
    nullable: false,
  })
  role: ClinicUserRole;

  @Column({
    name: "status",
    type: "enum",
    enum: ClinicUserStatus,
    nullable: false,
  })
  status: ClinicUserStatus;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamptz",
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: "clinicId" })
  clinic: Clinic;
}
