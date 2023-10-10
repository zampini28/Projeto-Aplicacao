import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Aluno } from './Aluno'
import { Turma } from './Turma'

@Entity('nota')
export class Nota {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @OneToOne(type => Aluno, { cascade: true })
    @JoinColumn()
    aluno: Aluno

    @OneToOne(type => Turma, { cascade: true })
    @JoinColumn()
    turma: Turma

    @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true, default: null })
    prova: number

    @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true, default: null })
    trabalho: number

    @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true, default: null })
    nota_final: number

    constructor() {
        if (!this.id)
            this.id = uuid;
    }
}