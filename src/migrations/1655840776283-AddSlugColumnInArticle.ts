import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlugColumnInArticle1655840776283 implements MigrationInterface {
    name = 'AddSlugColumnInArticle1655840776283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "slug"`);
    }

}
