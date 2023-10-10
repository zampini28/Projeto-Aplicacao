import { Entity, PrimaryColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Usuario } from './Usuario'
import { Administrador } from './Administrador'

@Entity('responsavel')
export class Responsavel {
    @PrimaryColumn({ type: 'uuid' })
    id: string

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