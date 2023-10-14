import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { Product } from "./entity/Product"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

    // register express routes from defined application routes
    // register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            //result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            result.then(d => {
                if (d && d.status)
                    res.status(d.status).send(d.message || d.errors);
                else
                    res.json(d);
            })

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new users for test
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(Product, {
    //         Code: 123,
    //         Name: "Mouse"            
    //     })
    // )    

    console.log("Server on http://localhost:3000")

}).catch(error => console.log(error))
