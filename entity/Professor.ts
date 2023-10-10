import { Entity, PrimaryColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Usuario } from './Usuario'
import { Disciplina } from './Disciplina'

@Entity('professor')
export class Professor {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @ManyToOne(type => Disciplina, { cascade: true })
    @JoinColumn()
    disciplina: Disciplina

    @OneToOne(type => Usuario, { cascade: true })
    @JoinColumn()
    usuario: Usuario

    constructor() {
        if (!this.id)
            this.id = uuid();
    }
}