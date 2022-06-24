import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generated1655749354893 implements MigrationInterface {
  name = 'Generated1655749354893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "post" character varying NOT NULL, "coverPhoto" character varying, "userId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "tag" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, "name" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "salt" character varying NOT NULL, "refreshToken" character varying NOT NULL, "lastLoginDate" TIMESTAMP, "isFreezed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "postTag" ("postId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_17ceee2baf04e93cdac9b99c08d" PRIMARY KEY ("postId", "tagId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6583043d4c3b1f6c5eb8db4938" ON "postTag" ("postId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_37af736d457a23e58fd25aecd1" ON "postTag" ("tagId") `
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "postTag" ADD CONSTRAINT "FK_6583043d4c3b1f6c5eb8db49387" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "postTag" ADD CONSTRAINT "FK_37af736d457a23e58fd25aecd14" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "postTag" DROP CONSTRAINT "FK_37af736d457a23e58fd25aecd14"`
    );
    await queryRunner.query(
      `ALTER TABLE "postTag" DROP CONSTRAINT "FK_6583043d4c3b1f6c5eb8db49387"`
    );
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_37af736d457a23e58fd25aecd1"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6583043d4c3b1f6c5eb8db4938"`);
    await queryRunner.query(`DROP TABLE "postTag"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "post"`);
  }
}
