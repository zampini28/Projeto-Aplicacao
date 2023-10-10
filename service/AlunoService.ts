import 'reflect-metadata'
import { getAlunoRepository } from '../repository/AlunoRepository'
import { getUserRepository } from '../repository/UserRepository'
import { Usuario } from '../entity/Usuario'
import { Aluno } from '../entity/Aluno'
import { hash } from 'bcryptjs'
import { getAdminRepository } from '../repository/AdminRepository'

interface IAlunoRequest
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
    matricula: string
    administrador?: string
}

export class AlunoService 
{
    private AlunoRepository = getAlunoRepository()
    private UserRepository = getUserRepository()
    private AdminRepository = getAdminRepository()

    async inserir(data: IAlunoRequest) 
    {
        const result = await this.UserRepository.findOne({ where: { usuario: data.usuario }})

        if (result !== null)
            return new Error('Nome de usuário já existente')
            
        await hash(data.senha, 8)
            .then(senhaHash => data.senha = senhaHash)
            .catch(err => data.senha = undefined)

        const aluno = new Aluno()
        aluno.matricula = data.matricula
        aluno.administrador = await this.AdminRepository.findOne({ where: { id: data.administrador }})
        aluno.usuario = Object.assign(new Usuario, data)

        return await this.AlunoRepository
            .save(aluno)
            .then(result => result)
            .catch(err => new Error('Não foi possível criar Aluno. Verifique se tudo foi preenchido!'))
    }

     async listar()
     {
         return await this.AlunoRepository
             .find({ relations: ['usuario'] })
             .then(result => result)
             .catch(err => new Error('Não foi possível listar Alunos'))
     }

    async buscar(id: string)
    {
        return await this.AlunoRepository
            .findOne({ where: { id: id }, relations: ['usuario']})
            .then(result => (result !== null) ? result : 'Nenhum usuário foi encontrado.')
            .catch(err => new Error('Não foi possível buscar Aluno.'))
    }

    async atualizar(id: string, data: IAlunoRequest)
    {
        const aluno = await this.AlunoRepository.findOne({ where: { id: id }, relations: ['usuario'] })

        if (aluno === null)
            return new Error('Esse aluno não existe')
        
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
            .then(result => this.AlunoRepository.findOne({ where: { id: id }, relations: ['usuario'] }))
            .catch(err => new Error('Não foi possível atualizar aluno.'))
    }

    async remover(id: string)
    {
        const aluno = await this.AlunoRepository.findOne({ where: { id: id }, relations: ['usuario'] })

        if (aluno === null)
            return new Error('Esse aluno não existe')

        const user_id = aluno.usuario.id
        
        return await this.AlunoRepository
            .delete(id)
            .then(result => (result !== null) 
                ? this.UserRepository.delete(user_id)
                    .then(result => 'O aluno foi removido.') : 'Nenhum usuário foi encontrado.'
            )
            .catch(err => new Error('Não foi possível remover aluno'))
    }
}