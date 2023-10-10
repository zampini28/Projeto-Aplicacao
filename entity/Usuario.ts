import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('usuario')
export class Usuario {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column()
    nome: string
    
    @Column()
    rg: string
    
    @Column()
    cpf: string

    @Column({ nullable: true, default: null})
    n_telefone: string

    @Column()
    email: string

    @Column({ unique: true })
    usuario: string

    @Column({ type: 'date' })
    nascimento: Date

    @CreateDateColumn()
    cadastro_em: Date

    @UpdateDateColumn()
    atualizado_em: Date

    @Column({ default: false })
    bloqueado: boolean

    @Column()
    senha: string

    constructor() {
        if (!this.id)
            this.id = uuid()
    }
}