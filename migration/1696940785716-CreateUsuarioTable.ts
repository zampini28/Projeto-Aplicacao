import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsuarioTable1696940785716 implements MigrationInterface {
    name = 'CreateUsuarioTable1696940785716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL, "nome" character varying NOT NULL, "rg" character varying NOT NULL, "cpf" character varying NOT NULL, "n_telefone" character varying, "email" character varying NOT NULL, "usuario" character varying NOT NULL, "nascimento" date NOT NULL, "cadastro_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "bloqueado" boolean NOT NULL DEFAULT false, "senha" character varying NOT NULL, CONSTRAINT "UQ_9921cd8ed63a072b8f93ead80f0" UNIQUE ("usuario"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "administrador" ("id" uuid NOT NULL, "usuarioId" uuid, CONSTRAINT "REL_9f49fd7652e545f18b6e8360ab" UNIQUE ("usuarioId"), CONSTRAINT "PK_a84433082c320e8c25abe76c52e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aluno" ("id" uuid NOT NULL, "matricula" character varying NOT NULL, "administradorId" uuid, "usuarioId" uuid, CONSTRAINT "REL_8fbcdd66cfdb4304b8764d97e8" UNIQUE ("usuarioId"), CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "disciplina" ("id" uuid NOT NULL, "disciplina" character varying NOT NULL, CONSTRAINT "UQ_80deb2c7257e4f5d39938853c70" UNIQUE ("disciplina"), CONSTRAINT "PK_02bd5fd4e075740beb27bcdcddf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professor" ("id" uuid NOT NULL, "disciplinaId" uuid, "usuarioId" uuid, CONSTRAINT "REL_b146cfa894240d721bfac37d71" UNIQUE ("usuarioId"), CONSTRAINT "PK_39a6c8f16280dc3bc3ffdc41e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "responsavel" ("id" uuid NOT NULL, "administradorId" uuid, "usuarioId" uuid, CONSTRAINT "REL_4629bd4453d1cc5a2d5892bd07" UNIQUE ("usuarioId"), CONSTRAINT "PK_a7bff1fcceadee4bcf81b2bc4d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "administrador" ADD CONSTRAINT "FK_9f49fd7652e545f18b6e8360abf" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_beffde687c78e04612b27c3209c" FOREIGN KEY ("administradorId") REFERENCES "administrador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "FK_9e8ff9b69f278abfb46e2313bfb" FOREIGN KEY ("disciplinaId") REFERENCES "disciplina"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "FK_b146cfa894240d721bfac37d719" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responsavel" ADD CONSTRAINT "FK_7353ae7978b7b994c44c2f9b0f5" FOREIGN KEY ("administradorId") REFERENCES "administrador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responsavel" ADD CONSTRAINT "FK_4629bd4453d1cc5a2d5892bd07f" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "responsavel" DROP CONSTRAINT "FK_4629bd4453d1cc5a2d5892bd07f"`);
        await queryRunner.query(`ALTER TABLE "responsavel" DROP CONSTRAINT "FK_7353ae7978b7b994c44c2f9b0f5"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "FK_b146cfa894240d721bfac37d719"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "FK_9e8ff9b69f278abfb46e2313bfb"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_beffde687c78e04612b27c3209c"`);
        await queryRunner.query(`ALTER TABLE "administrador" DROP CONSTRAINT "FK_9f49fd7652e545f18b6e8360abf"`);
        await queryRunner.query(`DROP TABLE "responsavel"`);
        await queryRunner.query(`DROP TABLE "professor"`);
        await queryRunner.query(`DROP TABLE "disciplina"`);
        await queryRunner.query(`DROP TABLE "aluno"`);
        await queryRunner.query(`DROP TABLE "administrador"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
