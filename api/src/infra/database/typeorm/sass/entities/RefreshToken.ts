import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clinic } from "./Clinic";
import { User } from "./User";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "token", type: "varchar", nullable: false, unique: true })
  token: string;

  @Column({ name: "userId", type: "uuid", nullable: false })
  userId: string;

  @Column({ name: "clinicId", type: "uuid", nullable: true, default: null })
  clinicId: string;

  @Column({ name: "expiresAt", type: "timestamptz", nullable: false })
  expiresAt: Date;

  @Column({ name: "isRevoked", type: "boolean", default: false })
  isRevoked: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: "clinicId" })
  clinic: Clinic;
}
