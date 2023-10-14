import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/Product"
import { Component } from "./entity/Component"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Impacta123",
    database: "impacta-product",
    synchronize: true,
    logging: false,
    entities: [Product, Component],
    migrations: [],
    subscribers: [],

})
