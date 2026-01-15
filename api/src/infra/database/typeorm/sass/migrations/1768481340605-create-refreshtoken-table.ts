import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateRefreshtokenTable1768481340605
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "token",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "expires_at",
            type: "timestamptz",
            isNullable: false,
          },
          {
            name: "is_revoked",
            type: "boolean",
            default: false,
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamptz",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamptz",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "refresh_tokens",
      new TableForeignKey({
        name: "FK_refresh_token_user_id",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.query(`
      CREATE INDEX "IDX_refresh_token_token" ON "refresh_tokens" ("token")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_refresh_token_user_id" ON "refresh_tokens" ("user_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_refresh_token_token"`);
    await queryRunner.query(`DROP INDEX "IDX_refresh_token_user_id"`);
    await queryRunner.dropForeignKey(
      "refresh_tokens",
      "FK_refresh_token_user_id"
    );
    await queryRunner.dropTable("refresh_tokens");
  }
}
