import { AdminController } from "./controller/AdminController";


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
}]