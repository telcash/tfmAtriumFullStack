import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';
import { CategoryEntity } from './entities/category.entity';

/**
 * Controlador del modulo {@link CategoriesModule}
 * Procesa las peticiones al endpoint 'products/categories'
 * Acceso solo para usuarios tipo Admin
 */
@Controller('categories')
@UseGuards(JwtAccessGuard, RoleGuard)
@Roles(UserRole.ADMIN)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Endpoint para solicitud de creación de una categoría
   * @param createCategoryDto - Dto para la creación de la categoría
   * @returns {CategoryEntity} - Categoría creada
   */
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return new CategoryEntity(await this.categoriesService.create(createCategoryDto));
  }

  /**
   * Endpoint para solicitar un listado de todas las categorias
   * @returns {CategoryEntity[]} - Listado de las categorías
   */
  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.categoriesService.findAll()
    return categories.map((category) => new CategoryEntity(category));
  }

  /**
   * Endpoint para solicitar una categoría por su id
   * @param {string} id - Id de la categoría
   * @returns {CategoryEntity} - Categoría solicitada
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryEntity> {
    return new CategoryEntity(await this.categoriesService.findOne(+id));
  }

  /**
   * Endpoint para solicitar la actualización de una categoría
   * @param {number} id - Id de la categoría
   * @param {UpdateCategoryDto} updateCategoryDto - Dto con los datos de actualización de la categoría
   * @returns {CategoryEntity} - Categoría actualizada
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    return new CategoryEntity(await this.categoriesService.update(+id, updateCategoryDto));
  }

  /**
   * Endpoint para solicitar la eliminación de una categoría
   * @param {number} id - Id de la categoría
   * @returns {CategoryEntity} - Categoría eliminada
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new CategoryEntity(await this.categoriesService.remove(+id));
  }
}
