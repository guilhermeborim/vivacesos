import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clinic } from "./Clinic";
import { ClinicUserRole } from "./ClinicUsers";

@Entity("clinic_invites")
export class ClinicInvite {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "clinicId", type: "uuid", nullable: false })
  clinicId: string;

  @Column({
    name: "email",
    type: "varchar",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: "role",
    type: "enum",
    enum: ClinicUserRole,
    nullable: false,
  })
  role: ClinicUserRole;

  @Column({ name: "token", type: "varchar", nullable: false, unique: true })
  token: string;

  @Column({
    name: "accepted",
    type: "boolean",
    default: false,
    nullable: false,
  })
  accepted: boolean;

  @CreateDateColumn({
    name: "expiresAt",
    type: "timestamptz",
    nullable: false,
  })
  expiresAt: Date;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamptz",
    nullable: false,
  })
  createdAt: Date;

  @CreateDateColumn({
    name: "acceptedAt",
    type: "timestamptz",
    nullable: true,
    default: null,
  })
  acceptedAt: Date;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: "clinicId" })
  clinic: Clinic;
}
