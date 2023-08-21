import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StorageService } from 'src/common/services/storage.service';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './entities/product.entity';
import { UserRole } from 'src/users/constants/user-role';
import { UpdateCartItemDto } from 'src/carts/cart-items/dto/update-cart-item.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly storageService: StorageService
  ) {}

  /**
   * Crea un nuevo producto
   * Invoca al método create() de {@link ProductsRepository} para crear el producto en la base de datos
   * @param {CreateProductDto} createProductDto - Dto validado con los datos para crear el producto
   * @param {string} fileName - Nombre del archivo de imagen validado y almacenado previamente
   * @returns - Producto Creado
   */
  async create(createProductDto: CreateProductDto, fileName: string) {
    // Petición al repositorio para crear el producto
    return await this.productsRepository.create({
      ...createProductDto,
      image: fileName,
    });
  }

  /**
   * Genera un listado de todos los productos, sin restricciones, para los usuarios tipo Admin
   * Genera un listado de todos los productos, con restricciones, para los usuarios que no sean tipo Admin
   * Invoca al método findAll() de {@link ProductsRep≤ository} para generar el listado para los usuarios tipo Admin
   * Invoca al método findAllForClients() de {@link ProductsRep≤ository} para generar el listado para los usuarios que no sean tipo Admin
   * @returns - Listado de productos
   */
  async findAll(role: UserRole, categoryId?: number) {
    // Si no hay categoryId lo convertimos a undefined
    // Prisma genera un error con NaN
    // Otra opcion es crear un Pipe que realice esta comprobación y el parsing a Int
    categoryId = categoryId ? categoryId : undefined;
    // Retorna un listado de todos los productos sin restricciones
    if (role === UserRole.ADMIN) {
      return await this.productsRepository.findAll(categoryId);
    }
    // Retorna un listado de todos los productos con restricciones
    return await this.productsRepository.findAllForClients(categoryId);
  }

  /**
   * Realiza la busqueda, sin restricciones, de un producto por id para un usuario tipo Admin
   * Realiza la busqueda, con restricciones, de un producto por id para un usuario que no sea tipo Admin
   * Invoca al método findOne() de {@link ProductsRepository} para buscar un producto sin restricciones
   * Invoca al método findOneForClients() de {@link ProductsRepository} para buscar un producto con restricciones
   * @param {number} id - Id del producto
   * @param role - Rol del usuario que hace la petición
   * @returns - Producto buscado
   */
  async findOne(id: number, role?: UserRole) {
    // Retorna un producto buscado sin restricciones
    if (role && role === UserRole.ADMIN) {
      return await this.productsRepository.findOne(id);
    }
    // Retorna un producto buscado con restricciones
    return await this.productsRepository.findOneForClients(id);
  }

  /**
   * Realiza la actualización de un producto
   * Invoca al método update() de {@link ProductsRepository} para actualizar el producto en la base de datos
   * @param {number} id - Id del producto 
   * @param {UpdateProductDto} updateProductDto - Dto del producto validado
   * @param {string} fileName - Nombre del archivo de imagen validado y almacenado previamente
   * @returns - Producto buscado
   */
  async update(id: number, updateProductDto: UpdateProductDto, fileName: string) {
    // Si hay un archivo de imagen para actualizar el producto, eliminamos la imagen anterior si existe
    if (fileName) {
      const oldImage: string = (await this.productsRepository.findOne(id)).image;
      if (oldImage) {
        this.storageService.deleteFile(this.storageService.imagesDestination, oldImage);
      }
      updateProductDto = {...updateProductDto, image: fileName}
    }

    // Peticion para actualizar el producto en la base de datos
    return await this.productsRepository.update(id, updateProductDto);
  }

  /**
   * Elimina un producto por id
   * Invoca al método remove() de {@link ProductsRepository} para eliminar el producto de la base de datos
   * @param {number} id - Id del producto 
   * @returns - Producto eliminado
   */
  async remove(id: number): Promise<ProductEntity> {
    // Peticion para eliminar el producto de la base de datos 
    const product = await this.productsRepository.remove(id);

    // Elimina del servidor el arhivo de imagen si este existe
    if (product && product.image) {
      this.storageService.deleteFile(this.storageService.imagesDestination, product.image);
    }
    return product;
  }

  /**
   * Actualiza el inventario de los productos cuando se genera una orden desde un carrito
   * @param {UpdateCartItemDto[]} updateCartItemDto - Listado de items en el carrito
   * @returns - Productos actualizados
   */
  async updateOnCartCheckout(updateCartItemDto: UpdateCartItemDto[]) {
    return await this.productsRepository.updateOnCartCheckout(updateCartItemDto);
  }

  /**
   * Actualiza el inventario de los productos cuando se revierte una orden desde un carrito
   * @param {UpdateCartItemDto[]} updateCartItemDto - Listado de items en el carrito 
   * @returns 
   */
  async rollbackCartCheckout(updateCartItemDto: UpdateCartItemDto[]) {
    return await this.productsRepository.rollbackCartCheckout(updateCartItemDto);
  }
}
