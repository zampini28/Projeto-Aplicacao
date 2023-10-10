import { DataSource, DataSourceOptions} from "typeorm"

const options: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: ['./entity/*.ts'],
    migrations: ['./migration/*.ts'],
}

export const dataSource = new DataSource(options)