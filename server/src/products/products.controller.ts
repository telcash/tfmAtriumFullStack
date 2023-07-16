import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
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
import { UserIsAdminInterceptor } from 'src/auth/interceptors/user-is-admin.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Endpoint para la creación de un producto
   * @param {Express.Multer.File} file - Archivo de imagen 
   * @param {CreateProductDto} createProductDto - DTO para crear el producto
   * @returns {ProductEntity} - Producto creado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', StorageService.saveImageOptions))
  @Post()
  async create(
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto): Promise<ProductEntity>{
      return new ProductEntity(await this.productsService.create(createProductDto, file));
  }

  /**
   * Endpoint para obtener todos los productos
   * Respuesta varía según el tipo de usuario
   * Usa {@link UserIsAdminInterceptor} para ver si el usuario es un Admin
   * @param req - Request
   * @returns {ProductEntity[]} - Listado de productos
   */
  @UseInterceptors(UserIsAdminInterceptor)
  @Get()
  async findAll(@Request() req): Promise<ProductEntity[]> {
    const products = await this.productsService.findAll(req);
    return products.map((product) => new ProductEntity(product));
  }

  /**
   * Endpoint para obtener un producto por id
   * Respuesta varía según el tipo de usuario
   * Usa {@link UserIsAdminInterceptor} para ver si el usuario es un Admin
   * @param req - Request 
   * @param {string} id - Id del producto
   * @returns {Promise<ProductEntity>} - Producto solicitado
   */
  @UseInterceptors(UserIsAdminInterceptor)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string): Promise<ProductEntity> {
    return new ProductEntity(await this.productsService.findOne(+id, req));
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
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
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
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductEntity> {
    return new ProductEntity(await this.productsService.remove(+id));
  }
}
