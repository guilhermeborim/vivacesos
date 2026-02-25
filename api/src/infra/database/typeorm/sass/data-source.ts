import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Clinic } from "./entities/Clinic"
import { ClinicInvite } from "./entities/ClinicInvites"
import { ClinicUser } from "./entities/ClinicUsers"
import { Patient } from "./entities/Patient"
import { Professional } from "./entities/Professional"
import { RefreshToken } from "./entities/RefreshToken"
import { User } from "./entities/User"

import { CreateUsersTable1768407876674 } from "./migrations/1768407876674-create-users-table"
import { CreateRefreshtokenTable1768481340605 } from "./migrations/1768481340605-create-refreshtoken-table"
import { CreateClinicTable1768484945475 } from "./migrations/1768484945475-create-clinic-table"
import { CreateClinicusersTable1768485083780 } from "./migrations/1768485083780-create-clinicusers-table"
import { CreateProfessionalTable1768503803439 } from "./migrations/1768503803439-create-professional-table"
import { UpdateUser1769440534456 } from "./migrations/1769440534456-update-user"
import { InsertClinicIdRefreshToken1769526627788 } from "./migrations/1769526627788-insert-clinicId-refreshToken"
import { CreateClinicInvite1770296268849 } from "./migrations/1770296268849-create-clinic-invite"
import { CreatePatientTable1771255635046 } from "./migrations/1771255635046-create-patient-table"

export const SassDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: String(process.env.DATABASE_PASSWORD),
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Clinic, ClinicUser, ClinicInvite, Patient, Professional, RefreshToken],
  migrations: [
    CreateUsersTable1768407876674,
    CreateRefreshtokenTable1768481340605,
    CreateClinicTable1768484945475,
    CreateClinicusersTable1768485083780,
    CreateProfessionalTable1768503803439,
    UpdateUser1769440534456,
    InsertClinicIdRefreshToken1769526627788,
    CreateClinicInvite1770296268849,
    CreatePatientTable1771255635046,
  ],
})
