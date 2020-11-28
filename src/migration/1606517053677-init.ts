import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1606517053677 implements MigrationInterface {
  name = 'init1606517053677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "example_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "definition" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_fccd73330168066a434dbac114f" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "example_entity"`);
  }
}
