import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "email", type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  @Column({ name: "active", type: "boolean", default: true, nullable: false })
  active: boolean;

  @Column({
    name: "email_verified",
    type: "boolean",
    default: false,
    nullable: false,
  })
  emailVerified: boolean;

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
