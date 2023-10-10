import 'reflect-metadata'
import { getAlunoRepository } from '../repository/AlunoRepository'
import { getUserRepository } from '../repository/UserRepository'
import { Administrador } from '../entity/Administrador'
import { Usuario } from '../entity/Usuario'
import { Aluno } from '../entity/Aluno'
import { hash } from 'bcryptjs'
import { getAdminRepository } from '../repository/AdminRepository'
import { getDisciplinaRepository } from '../repository/DisciplinaRepository'
import { Disciplina } from '../entity/Disciplina'

interface IDisciplinaRequest
{
    disciplina: string
}

export class DisciplinaService 
{
    private DisciplinaRepository = getDisciplinaRepository()
    private AlunoRepository = getAlunoRepository()
    private UserRepository = getUserRepository()
    private AdminRepository = getAdminRepository()

    async inserir(data: IDisciplinaRequest) 
    {
        const result = await this.DisciplinaRepository.findOne({ where: { disciplina: data.disciplina }})

        if (result !== null)
            return new Error('Essa disciplina já existente')
            
        const disciplina = new Disciplina()
        disciplina.disciplina = data.disciplina

        return await this.DisciplinaRepository
            .save(disciplina)
            .then(result => result)
            .catch(err => new Error('Não foi possível criar Disciplina. Verifique se tudo foi preenchido!'))
    }

     async listar()
     {
         return await this.DisciplinaRepository
             .find()
             .then(result => result)
             .catch(err => new Error('Não foi possível listar Disciplinas'))
     }

    async buscar(id: string)
    {
        return await this.DisciplinaRepository
            .findOne({ where: { id: id }})
            .then(result => (result !== null) ? result : 'Nenhuma disciplina foi encontrado.')
            .catch(err => new Error('Não foi possível buscar Disciplina.'))
    }

    async atualizar(id: string, data: IDisciplinaRequest)
    {
        const disciplina = await this.DisciplinaRepository.findOne({ where: { id: id }})

        if (disciplina === null)
            return new Error('Essa disciplina não existe')
        
        const disciplina_id = disciplina.id;

        return await this.DisciplinaRepository
            .update(disciplina_id, Object.assign(new Disciplina, { disciplina: disciplina.disciplina}))
            .then(result => this.DisciplinaRepository.findOne({ where: { id: id }}))
            .catch(err => new Error('Não foi possível atualizar aluno.'))
    }

    async remover(id: string)
    {
        const disciplina = await this.DisciplinaRepository.findOne({ where: { id: id }})

        if (disciplina === null)
            return new Error('Essa disciplina não existe')
        
        return await this.DisciplinaRepository
            .delete(id)
            .then(result => 'A disciplina foi removida.')
            .catch(err => new Error('Não foi possível remover a disciplina'))
    }
}