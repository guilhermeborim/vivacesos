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

@Entity("patients")
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "clinicId", type: "uuid", nullable: false })
  clinicId: string;

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
  })
  name: string;

  @Column({
    name: "email",
    type: "varchar",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: "cpf",
    type: "varchar",
    nullable: false,
    unique: true,
  })
  cpf: string;

  @Column({
    name: "phone",
    type: "varchar",
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    name: "birth_date",
    type: "date",
    nullable: false,
  })
  birth_date: Date;

  @Column({ name: "active", type: "boolean", default: true, nullable: false })
  active: boolean;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamptz",
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updatedAt",
    type: "timestamptz",
    nullable: false,
  })
  updatedAt: Date;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: "clinicId" })
  clinic: Clinic;
}
