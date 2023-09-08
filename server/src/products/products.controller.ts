import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/common/pipes/image-validation.pipe';
import { StorageService } from 'src/common/services/storage.service';
import { ProductEntity } from './entities/product.entity';
import { UserRole } from 'src/users/constants/user-role';
import { User } from 'src/users/decorators/user.decorator';
import { SetRequestUserInterceptor } from 'src/auth/interceptors/set-req-user.interceptor';
import { SetRequestUserCartInterceptor } from 'src/carts/interceptors/set-request-user-cart.interceptor';

/**
 * Controlador del Módulo {@link ProductsModule}
 * Procesa las peticiones al endpoint 'products'
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Endpoint para solicitud de creación de un producto.
   * Acceso permitido sólo a usuarios tipo Admin
   * @param {Express.Multer.File} file - Archivo de imagen del producto. Procesada y validada por {@link StorageService} y {@link ImageValidationPipe}
   * @param {CreateProductDto} createProductDto - DTO con los datos para la creación del producto, validado con class-validator
   * @returns {ProductEntity} - Producto creado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file', StorageService.saveImageOptions))
  @Post()
  async create(
    @UploadedFile(ImageValidationPipe) fileName,
    @Body() createProductDto: CreateProductDto): Promise<ProductEntity>{
      return new ProductEntity (await this.productsService.create(createProductDto, fileName));
  }

  /**
   * Endpoint para solicitud de listado de productos
   * Usa {@link SetRequestUserInterceptor} para determinar el tipo de usuario que hace la solicitud
   * @param role - Rol del usuario que hace la petición
   * @returns {ProductEntity[]} - Listado de productos
   */
  @UseInterceptors(SetRequestUserInterceptor, SetRequestUserCartInterceptor)
  @Get()
  async findAll(@User('role') role, @User('cart') cart, @Query('category') categoryId?): Promise<ProductEntity[]> {
    const products = await this.productsService.findAll(role, +categoryId, cart.id);
    return products.map((product) => new ProductEntity(product));
  }

  /**
   * Endpoint para solicitud de un producto por id
   * Usa {@link SetRequestUserInterceptor} para determinar el tipo de usuario que hace la solicitud
   * @param role - Rol del usuario que hace la petición
   * @param {string} id - Id del producto 
   * @returns {ProductEntity} - Producto solicitado
   */
  @UseInterceptors(SetRequestUserInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string, @User('role') role: UserRole): Promise<ProductEntity> {
    return await new ProductEntity (await this.productsService.findOne(+id, role));
  }

  /**
   * Endpoint para solicitud de actualización de un Producto
   * Acceso permitido sólo a usuarios tipo Admin
   * @param {string} id - Id del producto 
   * @param {Express.Multer.File} file - Archivo de imagen del producto. Procesada y validada por {@link StorageService} y {@link ImageValidationPipe} 
   * @param {UpdateProductDto} updateProductDto - DTO con los datos de actualización 
   * @returns {ProductEntity} - Producto actualizado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file', StorageService.saveImageOptions))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile(ImageValidationPipe) file,
    @Body() updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return new ProductEntity (await this.productsService.update(+id, updateProductDto, file));
  }

  /**
   * Endpoint para solicitud de eliminación de un producto
   * Acceso permitido sólo a usuarios tipo Admin
   * @param {string} id - Id del producto
   * @returns {ProductEntity} - Producto Eliminado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductEntity> {
    return new ProductEntity (await this.productsService.remove(+id));
  }
}
