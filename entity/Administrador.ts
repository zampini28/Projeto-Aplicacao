import { Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Usuario } from './Usuario'

@Entity('administrador')
export class Administrador {
    @PrimaryColumn({ type: 'uuid' })
    id: string
    
    @OneToOne(type => Usuario, { cascade: true })
    @JoinColumn()
    usuario: Usuario
    
    constructor() {
        if (!this.id)
            this.id = uuid()
    }
}