import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Turma } from './Turma'

@Entity('tarefa')
export class Tarefa {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column({ type: 'text' })
    titulo: string

    @Column({ default: false})
    status: boolean

    @Column({ type: 'timestamp'})
    prazo: Date

    @Column({ type: 'decimal', precision: 4, scale: 2, default: 10.00 })
    notaMax: number

    @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true, default: null })
    nota: number

    @OneToOne(type => Turma, { cascade: true })
    @JoinColumn()
    turma: Turma

    constructor() {
        if (!this.id)
            this.id = uuid;
    }
}