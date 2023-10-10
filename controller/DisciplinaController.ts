import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { DisciplinaService } from '../service/DisciplinaService'

export class AlunoController 
{

    async inserir(request: Request, response: Response, next: NextFunction) 
    {
        const { disciplina } = request.body
        const disciplinaService = new DisciplinaService()

        const result = await disciplinaService.inserir({
            disciplina
        })

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }

    async listar(request: Request, response: Response, next: NextFunction)
    {
        const disciplinaService = new DisciplinaService()

        const result = await disciplinaService.listar()

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async buscar(request: Request, response: Response, next: NextFunction)
    {
        const disciplinaService = new DisciplinaService()

        const result = await disciplinaService.buscar(request.params.id)

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async atualizar(request: Request, response: Response, next: NextFunction)
    {
        const { id, disciplina } = request.body
        const disciplinaService = new DisciplinaService()

        const result = await disciplinaService.atualizar(id, {
            disciplina
        })

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }

    async remover(request: Request, response: Response, next: NextFunction)
    {
        const disciplinaService = new DisciplinaService()

        const result = await disciplinaService.remover(request.params.id)

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }
}