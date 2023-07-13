import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/common/pipes/image-validation.pipe';
import { StorageService } from 'src/common/services/storage.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', StorageService.saveImageOptions))
  @Post()
  async create(
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto): Promise<Product>{
      return await this.productsService.create(createProductDto, file);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(+id);
  }

  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', StorageService.saveImageOptions))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productsService.update(+id, updateProductDto, file);
  }

  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return await this.productsService.remove(+id);
  }
}
