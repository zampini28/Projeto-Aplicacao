import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Turma } from './Turma'
import { Usuario } from './Usuario'

@Entity('faq')
export class FAQ {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @OneToOne(type => Usuario, { cascade: true })
    @JoinColumn()
    usuario: Usuario

    @Column({ type: 'text' })
    conteudo: string

    @CreateDateColumn()
    criado_em: Date

    @OneToOne(type => Turma, { cascade: true })
    @JoinColumn()
    turma: Turma

    constructor() {
        if (!this.id)
            this.id = uuid;
    }
}