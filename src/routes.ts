import { ComponentController } from "./controller/ComponentController"
import { ProductController } from "./controller/ProductController"

export const Routes = 
[
    
    
     //ROUTES COMPONENTS  
    {method: "get", route: "/api/v1/produto/componente", controller: ComponentController, action: "getbydescription"},
    {method: "get", route: "/api/v1/produto/:codigo/componente/:id", controller: ComponentController, action: "one"},
    {method: "get", route: "/api/v1/produto/:codigo/componente", controller: ComponentController, action: "all"},   
    {method: "post",route: "/api/v1/produto/:codigo/componente", controller: ComponentController, action: "save"},

    // ROUTES PRODUCTS
    {method: "get", route: "/api/v1/produto", controller: ProductController,action: "all"}, 
    {method: "get", route: "/api/v1/produto/:codigo", controller: ProductController,action: "one"}, 
    {method: "post",route: "/api/v1/produto", controller: ProductController,action: "save"}
    
    
]