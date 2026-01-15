import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1768407876674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar(50)",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar(100)",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar(255)",
            isNullable: false,
          },
          {
            name: "active",
            type: "boolean",
            isNullable: false,
            default: true,
          },
          {
            name: "email_verified",
            type: "boolean",
            isNullable: false,
            default: false,
          },
          {
            name: "created_at",
            type: "timestamptz",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamptz",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
