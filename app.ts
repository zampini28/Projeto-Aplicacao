import 'reflect-metadata'
import express from 'express'
import { routes } from './routes'
import { dataSource } from './data-source'

dataSource.initialize().then(
    async () => 
    {
        const app = express()
        app.use(express.json())
        routes.forEach(
            route => app[route.method](route.path, (new (route.handler))[route.action])
        )
        app.listen(3000, () => console.log('server on port 3000'))
    }
).catch(err => console.log('Não foi possível connectar ao banco de dados', err))
