import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

import { MongooseModule } from '@nestjs/mongoose';






@Module({
  imports: [
    ProductsModule,  //need to import modules here 
    MongooseModule.forRoot("mongodb+srv://Romdhane:Romdhane@cluster0.wi0ztia.mongodb.net/nestjs-demo")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}