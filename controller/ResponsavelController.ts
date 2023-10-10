import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { ResponsavelService } from '../service/ResponsavelService'

export class ResponsavelController 
{

    async inserir(request: Request, response: Response, next: NextFunction) 
    {
        const {nome, rg, cpf, n_telefone, email, usuario, nascimento, bloqueado, senha, administrador } = request.body
        const responsavelService = new ResponsavelService()

        const result = await responsavelService.inserir({
            nome,
            rg,
            cpf,
            n_telefone,
            email,
            usuario,
            nascimento,
            bloqueado,
            senha,
            administrador
        })

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }

    async listar(request: Request, response: Response, next: NextFunction)
    {
        const responsavelService = new ResponsavelService()

        const result = await responsavelService.listar()

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async buscar(request: Request, response: Response, next: NextFunction)
    {
        const responsavelService = new ResponsavelService()

        const result = await responsavelService.buscar(request.params.id)

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async atualizar(request: Request, response: Response, next: NextFunction)
    {
        const {id, nome, rg, cpf, n_telefone, email, usuario, nascimento, bloqueado, senha } = request.body
        const responsavelService = new ResponsavelService()

        const result = await responsavelService.atualizar(id, {
            nome,
            rg,
            cpf,
            n_telefone,
            email,
            usuario,
            nascimento,
            bloqueado,
            senha
        })

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }

    async remover(request: Request, response: Response, next: NextFunction)
    {
        const responsavelService = new ResponsavelService()

        const result = await responsavelService.remover(request.params.id)

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }
}