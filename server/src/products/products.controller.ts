import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/common/pipes/image-validation.pipe';
import { StorageService } from 'src/common/services/storage.service';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Endpoint para la creación de un producto.
   * @param {Express.Multer.File} file - Archivo de imagen 
   * @param {CreateProductDto} createProductDto - DTO para crear el producto
   * @returns {ProductEntity} - Producto creado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', StorageService.saveImageOptions))
  @Post('/admin')
  async create(
    @UploadedFile(ImageValidationPipe) file,
    @Body() createProductDto: CreateProductDto): Promise<ProductEntity>{
      return new ProductEntity(await this.productsService.create(createProductDto, file));
  }

  /**
   * Endpoint para un cliente obtener todos los productos disponibles
   * @returns {ProductEntity[]} - Listado de productos
   */
  @Get()
  async findAllForClients(): Promise<ProductEntity[]> {
    const products = await this.productsService.findAllForClients();
    return products.map((product) => new ProductEntity(product));
  }

  /**
   * Endpoint para un Admin obtener todos los productos
   * @param req - Request
   * @returns {ProductEntity[]} - Listado de productos
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get('/admin')
  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productsService.findAll();
    return products.map((product) => new ProductEntity(product));
  }

  /**
   * Endpoint para un cliente obtener un producto por id
   * @param {string} id - Id del producto 
   * @returns {ProductEntity} - Producto solicitado
   */
  @Get(':id')
  async findOneForClients(@Param('id') id: string): Promise<ProductEntity> {
    return new ProductEntity(await this.productsService.findOneForClients(+id));
  }

  /**
   * Endpoint para un Admin obtener un producto por id
   * @param req - Request 
   * @param {string} id - Id del producto
   * @returns {Promise<ProductEntity>} - Producto solicitado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get('/admin/:id')
  async findOne(@Param('id') id: string): Promise<ProductEntity> {
    return new ProductEntity(await this.productsService.findOne(+id));
  }
  

  /**
   * Endpoint para Actualizar un Producto
   * Solo para usuarios ADMIN
   * @param {string} id - Id del producto 
   * @param {Express.Multer.File} file - Archivo de imagen del producto 
   * @param {UpdateProductDto} updateProductDto - DTO de actualización 
   * @returns {ProductEntity} - Producto actualizado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', StorageService.saveImageOptions))
  @Patch('/admin/:id')
  async update(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe) file,
    @Body() updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return new ProductEntity(await this.productsService.update(+id, updateProductDto, file));
  }

  /**
   * Endpoint para eliminar un producto
   * Solo para usuarios ADMIN
   * @param {string} id - Id del producto
   * @returns {ProductEntity} - Producto Eliminado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Delete('/admin/:id')
  async remove(@Param('id') id: string): Promise<ProductEntity> {
    return new ProductEntity(await this.productsService.remove(+id));
  }
}
