import {MigrationInterface, QueryRunner} from "typeorm";

export class SoftDeleteAndUserLastLoginFreezeFieldsAdded1645912381467 implements MigrationInterface {
    name = 'SoftDeleteAndUserLastLoginFreezeFieldsAdded1645912381467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLoginDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isFreezed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isFreezed"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLoginDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "isDeleted"`);
    }

}
