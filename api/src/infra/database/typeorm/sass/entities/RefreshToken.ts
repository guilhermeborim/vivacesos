import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "token", type: "varchar", nullable: false, unique: true })
  token: string;

  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId: string;

  @Column({ name: "expires_at", type: "timestamptz", nullable: false })
  expiresAt: Date;

  @Column({ name: "is_revoked", type: "boolean", default: false })
  isRevoked: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
