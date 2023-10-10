import { Entity, PrimaryColumn, Column } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('disciplina')
export class Disciplina {
    @PrimaryColumn({ type: 'uuid' })
    id: string
    
    @Column({ unique: true })
    disciplina: string

    constructor() {
        if (!this.id)
            this.id = uuid()
    }
}