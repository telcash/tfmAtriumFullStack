import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  /**
   * Gestiona la creación de una categoría
   * Invoca el metodo create() de {@link CategoriesRepository} para crear una categoría en la base de datos
   * @param {CreateCategoryDto} createCategoryDto - Dto con los datos de la categoría a crear 
   * @returns - Categoría creada 
   */
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.create(createCategoryDto);
  }

  /**
   * Gestiona la busqueda de todas las categorías
   * Invoca el metodo findAll() de {@link CategoriesRepository} para buscar todas las categorías en la base de datos
   * @returns - Listado de todas las categorías
   */
  async findAll() {
    return await this.categoriesRepository.findAll();
  }

  /**
   * Gestiona la busqueda de una categoría por id
   * Invoca el metodo findOne() de {@link CategoriesRepository} para buscar una categoría en la base de datos
   * @param {number} id - Id de la categoría
   * @returns - Categoría buscada
   */
  async findOne(id: number) {
    return await this.categoriesRepository.findOne(id) ;
  }

  /**
   * Gestiona la actualización de una categoría por id
   * Invoca el metodo update() de {@link CategoriesRepository} para actualizar la categoría en la base de datos
   * @param {number} id - Id de la categoría 
   * @param {UpdateCategoryDto} updateCategoryDto - Dto con los datos para actualizar la categoría 
   * @returns - Categoría actualizada
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesRepository.update(id, updateCategoryDto);
  }

  /**
   * Gestiona la eliminación de una categoría por id
   * Invoca el metodo remove() de {@link CategoriesRepository} para eliminar la categoría de la base de datos
   * @param {number} id - Id de la categoría 
   * @returns - Categoría eliminada
   */
  async remove(id: number) {
    return await this.categoriesRepository.remove(id);
  }
}
