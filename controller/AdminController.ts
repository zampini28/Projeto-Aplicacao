import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { AdminService } from '../service/AdminService'

export class AdminController 
{

    async inserir(request: Request, response: Response, next: NextFunction) 
    {
        const {nome, rg, cpf, n_telefone, email, usuario, nascimento, bloqueado, senha} = request.body
        const adminService = new AdminService()

        const result = await adminService.inserir({
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

    async listar(request: Request, response: Response, next: NextFunction)
    {
        const adminService = new AdminService()

        const result = await adminService.listar()

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async buscar(request: Request, response: Response, next: NextFunction)
    {
        const adminService = new AdminService()

        const result = await adminService.buscar(request.params.id)

        if ( result instanceof Error )
            return response.status(500).json(result.message)
        else
            return response.status(200).json(result)
    }

    async atualizar(request: Request, response: Response, next: NextFunction)
    {
        const {id, nome, rg, cpf, n_telefone, email, usuario, nascimento, bloqueado, senha} = request.body
        const adminService = new AdminService()

        const result = await adminService.atualizar(id, {
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
        const adminService = new AdminService()

        const result = await adminService.remover(request.params.id)

        if ( result instanceof Error )
            return response.status(400).json(result.message)
        else
            return response.status(201).json(result)
    }
}