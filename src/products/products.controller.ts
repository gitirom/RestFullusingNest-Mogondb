    import {
        Controller,
        Post,
        Body,
        Get,
        Param,
        Patch,
        Delete,
    } from '@nestjs/common';
    
    import { ProductsService } from './products.service';
    
    @Controller('products')
    export class ProductsController {
        constructor(private readonly productsService: ProductsService) {}
    
        @Post()
        async addProduct(
            @Body('title') prodTitle: string,        //data that you will post it 
            @Body('description') prodDesc: string,
            @Body('price') prodPrice: number,
        ) {
        const newProduct = await this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );
        return newProduct;
        }
    
        @Get()
        async getAllProducts() {
            const products = await this.productsService.getProducts();
            return products.map(prod => ({
                id : prod.id,
                title: prod.title,
                description: prod.description,
                price: prod.price,
            }));
        }
    
        @Get(':id')
        getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
        }
    
        @Patch(':id')
        updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
        ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
        }
    
        @Delete(':id')
        removeProduct(@Param('id') prodId: string) {
            this.productsService.deleteProduct(prodId);
            return null;
        }
    }



    // Think of it like this:

    // Controller: The restaurant manager taking your order and assigning it to the kitchen.
    // Service: The chef in the kitchen preparing your food.





//     Controllers:

// Act as the entry point for all HTTP requests. They handle incoming requests, parse their data, and delegate relevant work to services.
// Focus primarily on routing and orchestration. They define routes, validate data, and map requests to appropriate services or actions.
// Remain thin and focused. They shouldn't contain complex business logic or perform data manipulation directly.
// Services:

// Encapsulate the application's business logic. They perform tasks like data access, calculations, and complex computations.
// Can be used by multiple controllers or other parts of the application. They promote code reusability and separation of concerns.
// Are typically designed to be independent of any specific framework or technology. This makes them more reusable and testable.