import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { AlunoService } from '../service/AlunoService'

export class AlunoController 
{

    async inserir(request: Request, response: Response, next: NextFunction) 
    {
        const {nome, rg, cpf, n_telefone, email, usuario, nascimento, bloqueado, senha, matricula, administrador } = request.body
        const alunoService = new AlunoService()

        const result = await alunoService.inserir({
            nome,
            rg,
            cpf,
            n_telefone,
            email,
            usuario,
            nascimento,
            bloqueado,
            senha,
            matricula,
            administrador
        })

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }

    async listar(request: Request, response: Response, next: NextFunction)
    {
        const alunoService = new AlunoService()

        const result = await alunoService.listar()

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async buscar(request: Request, response: Response, next: NextFunction)
    {
        const alunoService = new AlunoService()

        const result = await alunoService.buscar(request.params.id)

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async atualizar(request: Request, response: Response, next: NextFunction)
    {
        const {id, nome, rg, cpf, n_telefone, email, usuario, nascimento, bloqueado, senha, matricula } = request.body
        const alunoService = new AlunoService()

        const result = await alunoService.atualizar(id, {
            nome,
            rg,
            cpf,
            n_telefone,
            email,
            usuario,
            nascimento,
            bloqueado,
            senha,
            matricula
        })

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }

    async remover(request: Request, response: Response, next: NextFunction)
    {
        const alunoService = new AlunoService()

        const result = await alunoService.remover(request.params.id)

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }
}