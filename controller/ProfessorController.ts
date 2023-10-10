import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { ProfessorService } from '../service/ProfessorService'

export class ProfessorController 
{

    async inserir(request: Request, response: Response, next: NextFunction) 
    {
        const {nome, rg, cpf, n_telefone, email, usuario, nascimento, bloqueado, senha, disciplina } = request.body
        const professorService = new ProfessorService()

        const result = await professorService.inserir({
            nome,
            rg,
            cpf,
            n_telefone,
            email,
            usuario,
            nascimento,
            bloqueado,
            senha,
            disciplina
        })

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }

    async listar(request: Request, response: Response, next: NextFunction)
    {
        const professorService = new ProfessorService()

        const result = await professorService.listar()

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async buscar(request: Request, response: Response, next: NextFunction)
    {
        const professorService = new ProfessorService()

        const result = await professorService.buscar(request.params.id)

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async atualizar(request: Request, response: Response, next: NextFunction)
    {
        const {id, nome, rg, cpf, n_telefone, email, usuario, nascimento, bloqueado, senha, disciplina } = request.body
        const professorService = new ProfessorService()

        const result = await professorService.atualizar(id, {
            nome,
            rg,
            cpf,
            n_telefone,
            email,
            usuario,
            nascimento,
            bloqueado,
            senha,
            disciplina
        })

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }

    async remover(request: Request, response: Response, next: NextFunction)
    {
        const professorService = new ProfessorService()

        const result = await professorService.remover(request.params.id)

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }
}