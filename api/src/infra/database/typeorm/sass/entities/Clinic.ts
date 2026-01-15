import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("clinics")
export class Clinic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "cnpj", type: "varchar", unique: true, nullable: false })
  cnpj: string;

  @Column({ name: "phone", type: "varchar", unique: true, nullable: false })
  phone: string;

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
}
