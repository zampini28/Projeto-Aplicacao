import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Disciplina } from './Disciplina'

@Entity('turma')
export class Turma {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column()
    nome: string

    @OneToOne(type => Disciplina, { cascade: true })
    @JoinColumn()
    disciplina: Disciplina
    constructor() {
        if (!this.id)
            this.id = uuid;
    }
}