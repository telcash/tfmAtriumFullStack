import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
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
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file', StorageService.saveImageOptions))
  @Post()
  async create(
    @UploadedFile(ImageValidationPipe) file,
    @Body() createProductDto: CreateProductDto): Promise<ProductEntity>{
      return new ProductEntity (await this.productsService.create(createProductDto, file));
  }

  /**
   * Endpoint para obtener todos los productos disponibles
   * @param role - Rol del usuario que hace la petición
   * @returns {ProductEntity[]} - Listado de productos
   */
  @UseInterceptors(SetRequestUserInterceptor)
  @Get()
  async findAll(@User('role') role: UserRole): Promise<ProductEntity[]> {
    const products = await this.productsService.findAll(role);
    return products.map((product) => new ProductEntity(product));
  }

  /**
   * Endpoint para obtener un producto por id
   * @param role - Rol del usuario que hace la petición
   * @param {string} id - Id del producto 
   * @returns {ProductEntity} - Producto solicitado
   */
  @UseInterceptors(SetRequestUserInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string, @User('role') role: UserRole): Promise<ProductEntity> {
    return new ProductEntity (await this.productsService.findOne(+id, role));
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
   * Endpoint para eliminar un producto
   * Solo para usuarios ADMIN
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
