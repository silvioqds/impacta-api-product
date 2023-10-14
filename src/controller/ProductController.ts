import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product"
import circularJson  from 'circular-json'
import { Component } from "../entity/Component"

export class ProductController {

    private productRepository = AppDataSource.getRepository(Product)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find()
    } 

    async one(request: Request, response: Response, next: NextFunction) {
        const codigo = parseInt(request.params.codigo)

        const product = await this.productRepository.findOne({
            where: { Code: codigo}
        })

        if (!product) {
            return "unregistered product"
        }
        return product
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { code, name } = request.body;

        if(!code || !name){
            return { status: 400, message: 'Informe o e-mail e senha para efetuar o login' };
        }
        
        const product = Object.assign(new Product(), {
            Code : code,
            Name : name,         
        })

        return await this.productRepository.save(product)
    }
}