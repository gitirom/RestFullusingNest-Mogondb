    import { Injectable, NotFoundException } from '@nestjs/common';

    import { Product } from './product.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

    @Injectable()
    export class ProductsService {
    private products: Product[] = [];

    //inject the mongoose model here
    constructor(
            @InjectModel('Product') private readonly productModel: Model<Product>
        ){}

    async insertProduct(title: string, desc: string, price: number) {
        // const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title: title,
            description: desc,
            price: price,
        });
        const result = await newProduct.save();
        return result;
        
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products as Product[] ;
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title) {
        updatedProduct.title = title;
        }
        if (desc) {
        updatedProduct.description = desc;
        }
        if (price) {
        updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
        throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
    }