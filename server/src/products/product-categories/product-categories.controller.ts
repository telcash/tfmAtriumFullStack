import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';

/**
 * Controlador del módulo {@link ProductCategoriesModule}
 * Controlador para agregar o eliminar categorías de un producto
 * Procesa las peticiones al endpoint 'product-categories'
 * Acceso solo para usuarios tipo Admin
 */
@UseGuards(JwtAccessGuard, RoleGuard)
@Roles(UserRole.ADMIN)
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  /**
   * Endpoint para agregar una categoría a un producto
   * @param {CreateProductCategoryDto} createProductCategoryDto - Dto con los datos para agregar la categoría al producto
   * @returns
   */
  @Post()
  async create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  /**
   * Endpoint para eliminar una categoría de un producto
   * @param {CreateProductCategoryDto} createProductCategoryDto - Dto con los datos para eliminar la categoría del producto 
   * @returns
   */
  @Delete()
  async remove(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesService.remove(createProductCategoryDto);
  }
}
