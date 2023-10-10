import 'reflect-metadata'
import { getAdminRepository } from '../repository/AdminRepository'
import { getUserRepository } from '../repository/UserRepository'
import { Administrador } from '../entity/Administrador'
import { Usuario } from '../entity/Usuario'
import { hash } from 'bcryptjs'

interface IAdminRequest
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
}

export class UserService
{
    private AdminRepository = getAdminRepository()
    private UserRepository = getUserRepository()

    async inserir(data: IAdminRequest) 
    {
        const result = await this.UserRepository.findOne({ where: { usuario: data.usuario }})

        if (result !== null)
            return new Error('Nome de usuário já existente')
            
        await hash(data.senha, 8)
            .then(senhaHash => data.senha = senhaHash)
            .catch(err => data.senha = undefined)

        const user = new Administrador()
        user.usuario = Object.assign(new Usuario, data)

        return await this.AdminRepository
            .save(user)
            .then(result => result)
            .catch(err => new Error('Não foi possível criar administrator. Verifique se tudo foi preenchido!'))
    }

     async listar()
     {
         return await this.AdminRepository
             .find({ relations: ['usuario'] })
             .then(result => result)
             .catch(err => new Error('Não foi possível listar Administratores'))
     }

    async buscar(id: string)
    {
        return await this.AdminRepository
            .findOne({ where: { id: id }, relations: ['usuario']})
            .then(result => (result !== null) ? result : 'Nenhum usuário foi encontrado.')
            .catch(err => new Error('Não foi possível buscar Administrator.'))
    }

    async atualizar(id: string, data: IAdminRequest) 
    {
        const admin = await this.AdminRepository.findOne({ where: { id: id }, relations: ['usuario'] })

        if (admin === null)
            return new Error('Esse administrador não existe')
        
        const user_id = admin.usuario.id

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
            .then(result => this.AdminRepository.findOne({ where: { id: id }, relations: ['usuario'] }))
            .catch(err => new Error('Não foi possível atualizar administrator.'))
    }

    async remover(id: string)
    {
        return await this.AdminRepository
            .delete(id)
            .then(result => (result !== null) ? 'O Administrator foi removido.' : 'Nenhum usuário foi encontrado.')
            .catch(err => new Error('Não foi possível remover Administrator'))
    }
}