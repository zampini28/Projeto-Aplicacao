import 'reflect-metadata'
import { getUserRepository } from '../repository/UserRepository'
import { Usuario } from '../entity/Usuario'
import { hash } from 'bcryptjs'
import { getAdminRepository } from '../repository/AdminRepository'
import { getResponsavelRepository } from '../repository/ResponsavelRepository'
import { Responsavel } from '../entity/Responsavel'

interface IResponsavelRequest
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
    administrador?: string
}

export class ResponsavelService 
{
    private ResponsavelRepository = getResponsavelRepository()
    private UserRepository = getUserRepository()
    private AdminRepository = getAdminRepository()

    async inserir(data: IResponsavelRequest) 
    {
        const result = await this.UserRepository.findOne({ where: { usuario: data.usuario }})

        if (result !== null)
            return new Error('Nome de usuário já existente')
            
        await hash(data.senha, 8)
            .then(senhaHash => data.senha = senhaHash)
            .catch(err => data.senha = undefined)

        const responsavel = new Responsavel()
        responsavel.administrador = await this.AdminRepository.findOne({ where: { id: data.administrador }})
        responsavel.usuario = Object.assign(new Usuario, data)

        return await this.ResponsavelRepository
            .save(responsavel)
            .then(result => result)
            .catch(err => new Error('Não foi possível criar Responsável. Verifique se tudo foi preenchido!'))
    }

     async listar()
     {
         return await this.ResponsavelRepository
             .find({ relations: ['usuario'] })
             .then(result => result)
             .catch(err => new Error('Não foi possível listar Responsáveis'))
     }

    async buscar(id: string)
    {
        return await this.ResponsavelRepository
            .findOne({ where: { id: id }, relations: ['usuario']})
            .then(result => (result !== null) ? result : 'Nenhum usuário foi encontrado.')
            .catch(err => new Error('Não foi possível buscar Responsável.'))
    }

    async atualizar(id: string, data: IResponsavelRequest)
    {
        const aluno = await this.ResponsavelRepository.findOne({ where: { id: id }, relations: ['usuario'] })

        if (aluno === null)
            return new Error('Esse Responsável não existe')
        
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
            .then(result => this.ResponsavelRepository.findOne({ where: { id: id }, relations: ['usuario'] }))
            .catch(err => new Error('Não foi possível atualizar Responsável.'))
    }

    async remover(id: string)
    {
        const aluno = await this.ResponsavelRepository.findOne({ where: { id: id }, relations: ['usuario'] })

        if (aluno === null)
            return new Error('Esse Responsável não existe')

        const user_id = aluno.usuario.id
        
        return await this.ResponsavelRepository
            .delete(id)
            .then(result => (result !== null) 
                ? this.UserRepository.delete(user_id)
                    .then(result => 'O responsável foi removido.') : 'Nenhum usuário foi encontrado.'
            )
            .catch(err => new Error('Não foi possível remover rRsponsável'))
    }
}