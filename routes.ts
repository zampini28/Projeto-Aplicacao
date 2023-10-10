import { AdminController } from './controller/AdminController'
import { AlunoController } from './controller/AlunoController'
import { ProfessorController } from './controller/ProfessorController'
import { DisciplinaController } from './controller/DisciplinaController'
import { ResponsavelController } from './controller/ResponsavelController'


export const routes = [{
    method: 'post',
    path: '/administrador',
    handler: AdminController,
    action: 'inserir'
}, {
    method: 'get',
    path: '/administrador',
    handler: AdminController,
    action: 'listar'
}, {
    method: 'get',
    path: '/administrador/:id',
    handler: AdminController,
    action: 'buscar'
},  {
    method: 'put',
    path: '/administrador',
    handler: AdminController,
    action: 'atualizar'
},  {
    method: 'delete',
    path: '/administrador/:id',
    handler: AdminController,
    action: 'remover'
}, {
    method: 'post',
    path: '/aluno',
    handler: AlunoController,
    action: 'inserir'
}, {
    method: 'get',
    path: '/aluno',
    handler: AlunoController,
    action: 'listar'
}, {
    method: 'get',
    path: '/aluno/:id',
    handler: AlunoController,
    action: 'buscar'
},  {
    method: 'put',
    path: '/aluno',
    handler: AlunoController,
    action: 'atualizar'
},  {
    method: 'delete',
    path: '/aluno/:id',
    handler: AlunoController,
    action: 'remover'
}, {
    method: 'post',
    path: '/professor',
    handler: ProfessorController,
    action: 'inserir'
}, {
    method: 'get',
    path: '/professor',
    handler: ProfessorController,
    action: 'listar'
}, {
    method: 'get',
    path: '/professor/:id',
    handler: ProfessorController,
    action: 'buscar'
},  {
    method: 'put',
    path: '/professor',
    handler: ProfessorController,
    action: 'atualizar'
},  {
    method: 'delete',
    path: '/professor/:id',
    handler: ProfessorController,
    action: 'remover'
}, {
    method: 'post',
    path: '/disciplina',
    handler: DisciplinaController,
    action: 'inserir'
}, {
    method: 'get',
    path: '/disciplina',
    handler: DisciplinaController,
    action: 'listar'
}, {
    method: 'get',
    path: '/disciplina/:id',
    handler: DisciplinaController,
    action: 'buscar'
},  {
    method: 'put',
    path: '/disciplina',
    handler: DisciplinaController,
    action: 'atualizar'
},  {
    method: 'delete',
    path: '/disciplina/:id',
    handler: DisciplinaController,
    action: 'remover'
}, {
    method: 'post',
    path: '/responsavel',
    handler: ResponsavelController,
    action: 'inserir'
}, {
    method: 'get',
    path: '/responsavel',
    handler: ResponsavelController,
    action: 'listar'
}, {
    method: 'get',
    path: '/responsavel/:id',
    handler: ResponsavelController,
    action: 'buscar'
},  {
    method: 'put',
    path: '/responsavel',
    handler: ResponsavelController,
    action: 'atualizar'
},  {
    method: 'delete',
    path: '/responsavel/:id',
    handler: ResponsavelController,
    action: 'remover'
}]