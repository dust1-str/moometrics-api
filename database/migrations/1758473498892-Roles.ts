import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1758473498892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL UNIQUE,
                "description" character varying,
                CONSTRAINT "PK_role_id" PRIMARY KEY ("id")
            )
        `);

        // Insertar roles básicos
        await queryRunner.query(`
            INSERT INTO "roles" ("name", "description") VALUES 
            ('admin', 'Administrador del sistema'),
            ('dev', 'Desarrollador')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
