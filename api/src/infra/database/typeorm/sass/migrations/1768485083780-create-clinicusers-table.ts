import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from "typeorm";

export class CreateClinicusersTable1768485083780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clinic_users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "clinic_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "role",
            type: "enum",
            enum: ["ADMIN", "PROFISSIONAL", "RECEPCIONISTA"],
            enumName: "clinic_user_role_enum",
            isNullable: false,
          },
          {
            name: "status",
            type: "enum",
            enum: ["INVITADO", "ATIVO", "INATIVO", "BLOQUEADO"],
            enumName: "clinic_user_status_enum",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamptz",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
        ],
        uniques: [
          new TableUnique({
            name: "UQ_clinic_users_user_clinic",
            columnNames: ["user_id", "clinic_id"],
          }),
        ],
      })
    );

    await queryRunner.createForeignKey(
      "clinic_users",
      new TableForeignKey({
        name: "FK_clinic_users_user_id",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "clinic_users",
      new TableForeignKey({
        name: "FK_clinic_users_clinic_id",
        columnNames: ["clinic_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clinics",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("clinic_users", "FK_clinic_users_user_id");
    await queryRunner.dropForeignKey(
      "clinic_users",
      "FK_clinic_users_clinic_id"
    );
    await queryRunner.dropTable("clinic_users");
    await queryRunner.query(`DROP TYPE IF EXISTS clinic_user_role_enum`);
    await queryRunner.query(`DROP TYPE IF EXISTS clinic_user_status_enum`);
  }
}
