import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product"
import circularJson  from 'circular-json'
import { Component } from "../entity/Component"

export class ComponentController {

private componentRepository = AppDataSource.getRepository(Component)
private productRepository = AppDataSource.getRepository(Product)

    async all(request: Request, response: Response, next: NextFunction) {
        const codigo = parseInt(request.params.codigo)

        const component = await this.componentRepository.find({
            where: { Code: codigo}
        })

        const product = await this.productRepository.findOne({ where: { Code: codigo } });
    
        if (!product) {
            return "unregistered product";
        }

        return { component, product };
    } 

    async one(request: Request, response: Response, next: NextFunction) {
        const { codigo, id } = request.params;
    
        try {
            const component = await this.componentRepository.findOne({
                where: { Code: codigo, id: id }
            });
    
            if (!component) {
                return "unregistered component";
            }            
    
            return component ; // Retorna ambos o componente e o produto
        } catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Ocorreu um erro ao buscar o componente' });
        }
    }

    async getbydescription(request: Request, response: Response, next: NextFunction){
        try {
            const {description} = request.query;
                       
            if (!description) {
                return response.status(400).send({ message: 'Informe a descrição do componente' });
            }

            const component = await this.componentRepository.findOne({ where : { Description : description.toString() }});

            if (!component) {
                return `unregistered component with description: ${description}`;
            }   
            return component;
        } catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Ocorreu um erro ao buscar o componente' });
        }
    }

     async save(request: Request, response: Response, next: NextFunction) {
        try {
            let { Code, ...body } = request.body;
    
            if (!Code || !body) {
                return response.status(400).send({ message: 'Informe o código do produto e as informações do componente' });
            }

            const product = await this.productRepository.findOne({ where : {Code}});

            if(!product){
                return response.status(400).send({ message: 'Código de produto não cadastrado' });
            }
            
            let exist = await this.componentRepository.findOne({where : {Code}});

            if(exist)
                return response.status(400).send({ message: 'Já existe um componente cadastrado para este código de produto' });

            const component = Object.assign(new Component(), {
                Code,
                ...body
            });
    
            const savedComponent =  await this.componentRepository.save(component);          
            return savedComponent;
        } catch (error) {
            console.error(error);
            return response.status(500).send({ message: 'Ocorreu um erro ao salvar o componente, verifique se já não foi cadastrado' });
        }
     }
}


