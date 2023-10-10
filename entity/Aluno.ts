import { Entity, PrimaryColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Usuario } from './Usuario'
import { Administrador } from './Administrador'

@Entity('aluno')
export class Aluno {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column()
    matricula: string

    @ManyToOne(type => Administrador, { cascade: true })
    @JoinColumn()
    administrador: Administrador

    @OneToOne(type => Usuario, { cascade: true })
    @JoinColumn()
    usuario: Usuario

    constructor() {
        if (!this.id)
            this.id = uuid();
    }
}