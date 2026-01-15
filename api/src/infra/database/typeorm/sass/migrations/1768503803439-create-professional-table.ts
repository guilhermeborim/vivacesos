import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from "typeorm";

export class CreateProfessionalTable1768503803439
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "professionals",
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
            name: "type",
            type: "enum",
            enum: ["MEDICO"],
            enumName: "professional_type_enum",
            isNullable: true,
          },
          {
            name: "crm",
            type: "varchar",
            isUnique: true,
            isNullable: true,
            default: null,
          },
          {
            name: "specialty",
            type: "varchar",
            isNullable: true,
            default: null,
          },
          {
            name: "active",
            type: "boolean",
            isNullable: false,
            default: true,
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
        uniques: [
          new TableUnique({
            name: "UQ_professionals_user_clinic",
            columnNames: ["user_id", "clinic_id"],
          }),
        ],
      })
    );

    await queryRunner.createForeignKey(
      "professionals",
      new TableForeignKey({
        name: "FK_professionals_user_id",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "professionals",
      new TableForeignKey({
        name: "FK_professionals_clinic_id",
        columnNames: ["clinic_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clinics",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "professionals",
      "FK_professionals_user_id"
    );
    await queryRunner.dropForeignKey(
      "professionals",
      "FK_professionals_clinic_id"
    );
    await queryRunner.dropTable("professionals");
    await queryRunner.query(`DROP TYPE IF EXISTS professional_type_enum`);
  }
}
