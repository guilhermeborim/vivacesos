import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Clinic } from "./Clinic";
import { User } from "./User";

export enum ProfessionalType {
  MEDICO = "MEDICO",
}

@Entity("professionals")
export class Professional {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId: string;

  @Column({ name: "clinic_id", type: "uuid", nullable: false })
  clinicId: string;

  @Column({
    name: "type",
    type: "enum",
    enum: ProfessionalType,
    nullable: true,
    default: ProfessionalType.MEDICO,
  })
  type: ProfessionalType;

  @Column({
    name: "crm",
    type: "varchar",
    unique: true,
    nullable: true,
    default: null,
  })
  crm: string;

  @Column({ name: "specialty", type: "varchar", nullable: true, default: null })
  specialty: string;

  @Column({ name: "active", type: "boolean", default: true, nullable: false })
  active: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    nullable: false,
  })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: "clinic_id" })
  clinic: Clinic;
}
