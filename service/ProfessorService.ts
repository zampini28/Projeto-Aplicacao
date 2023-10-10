import 'reflect-metadata'
import { getProfessorRepository } from '../repository/ProfessorRepository'
import { getUserRepository } from '../repository/UserRepository'
import { Usuario } from '../entity/Usuario'
import { Aluno } from '../entity/Aluno'
import { hash } from 'bcryptjs'
import { getAdminRepository } from '../repository/AdminRepository'
import { Professor } from '../entity/Professor'
import { getDisciplinaRepository } from '../repository/DisciplinaRepository'

interface IProfessorRequest
{
    nome: string
    rg: string
    cpf: string
    n_telefone: string
    email: string
    usuario: string
    nascimento: Date
    bloqueado: boolean
    senha: string
    disciplina: string
}

export class ProfessorService 
{
    private ProfessorRepository = getProfessorRepository()
    private UserRepository = getUserRepository()
    private DisciplinaRepository = getDisciplinaRepository()

    async inserir(data: IProfessorRequest) 
    {
        const result = await this.UserRepository.findOne({ where: { usuario: data.usuario }})

        if (result !== null)
            return new Error('Nome de usuário já existente')
            
        await hash(data.senha, 8)
            .then(senhaHash => data.senha = senhaHash)
            .catch(err => data.senha = undefined)

        const professor = new Professor()
        professor.disciplina = await this.DisciplinaRepository.findOne({ where: { id: data.disciplina }})
        professor.usuario = Object.assign(new Usuario, data)

        return await this.ProfessorRepository
            .save(professor)
            .then(result => result)
            .catch(err => new Error('Não foi possível criar Professor. Verifique se tudo foi preenchido!'))
    }

     async listar()
     {
         return await this.ProfessorRepository
             .find({ relations: ['usuario', 'disciplina'] })
             .then(result => result)
             .catch(err => new Error('Não foi possível listar Professores'))
     }

    async buscar(id: string)
    {
        return await this.ProfessorRepository
            .findOne({ where: { id: id }, relations: ['usuario', 'disciplina']})
            .then(result => (result !== null) ? result : 'Nenhum usuário foi encontrado.')
            .catch(err => new Error('Não foi possível buscar Professor.'))
    }

    async atualizar(id: string, data: IProfessorRequest)
    {
        const aluno = await this.ProfessorRepository.findOne({ where: { id: id }, relations: ['usuario'] })

        if (aluno === null)
            return new Error('Esse Professor não existe')
        
        const user_id = aluno.usuario.id

        await hash(data.senha, 8)
            .then(senhaHash => data.senha = senhaHash)
            .catch(err => data.senha = undefined)
        
        const user = new Usuario()
        user.id = undefined

        for (const element in data) {
            if (data[element] !== undefined)
                user[element] = data[element]
        }

        return await this.UserRepository
            .update(user_id, user)
            .then(result => this.ProfessorRepository.findOne({ where: { id: id }, relations: ['usuario', 'disciplina'] }))
            .catch(err => new Error('Não foi possível atualizar Professor.'))
    }

    async remover(id: string)
    {
        const aluno = await this.ProfessorRepository.findOne({ where: { id: id }, relations: ['usuario'] })

        if (aluno === null)
            return new Error('Esse Professor não existe')

        const user_id = aluno.usuario.id
        
        return await this.ProfessorRepository
            .delete(id)
            .then(result => (result !== null) 
                ? this.UserRepository.delete(user_id)
                    .then(result => 'O Professor foi removido.') : 'Nenhum usuário foi encontrado.'
            )
            .catch(err => new Error('Não foi possível remover Professor'))
    }
}