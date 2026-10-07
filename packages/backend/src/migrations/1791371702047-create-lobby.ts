import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLobby1791371702047 implements MigrationInterface {
  name = 'CreateLobby1791371702047';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."lobby_state_enum" AS ENUM('pending', 'in_game', 'showing_results', 'finished')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lobby_language_enum" AS ENUM('en', 'es', 'is')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lobby" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "code" character varying NOT NULL, "state" "public"."lobby_state_enum" NOT NULL, "language" "public"."lobby_language_enum" NOT NULL, CONSTRAINT "PK_0d9e681a820740df03d4ba784bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e75537fc31d4d0d98fef0106ae" ON "lobby"  ("code") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e75537fc31d4d0d98fef0106ae"`,
    );
    await queryRunner.query(`DROP TABLE "lobby"`);
    await queryRunner.query(`DROP TYPE "public"."lobby_language_enum"`);
    await queryRunner.query(`DROP TYPE "public"."lobby_state_enum"`);
  }
}
