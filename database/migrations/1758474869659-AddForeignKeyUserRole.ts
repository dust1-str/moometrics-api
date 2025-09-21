import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeyUserRole1758474869659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD CONSTRAINT "FK_users_role_id" 
            FOREIGN KEY ("role_id") REFERENCES "roles"("id") 
            ON DELETE RESTRICT ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            DROP CONSTRAINT "FK_users_role_id"
        `);
    }

}
