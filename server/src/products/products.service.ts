import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StorageService } from 'src/common/services/storage.service';
import { ProductsRepository } from './products.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository, private storageService: StorageService) {}

  /**
   * Crea un Producto
   * @param {CreateProductDto} createProductDto - Dto para crear el producto
   * @param {Express.Multer.File} file - Archivo de imagen
   * @returns {Product} - Producto Creado
   */
  async create(createProductDto: CreateProductDto, fileName: string): Promise<Product> {
    // Petición al repositorio para crear el producto
    return await this.productRepository.create({
      ...createProductDto,
      image: fileName,
    });
  }

  /**
   * Genera un listado de todos los productos disponibles para clientes
   * @returns {Product[]} - Listado de productos
   */
  async findAllForClients(): Promise<Product[]> {
    // Busca un listado de todos los productos disponibles para clientes
    return await this.productRepository.findAllForClients();
  }

  /**
   * Genera un listado de todos los productos
   * @returns {Product[]} - Listado de productos
   */
  async findAll(): Promise<Product[]> {
    // Busca un listado de todos los productos
    return await this.productRepository.findAll();
  }

  /**
   * Busca un producto por id si está disponible para clientes
   * @param {number} id - Id del producto 
   * @returns {Product} - Producto buscado
   */
  async findOneForClients(id: number): Promise<Product> {
    // Busca un producto que este disponible para clientes
    return await this.productRepository.findOneForClients(id);
  }

  /**
   * Busca un producto por id
   * @param {number} id - Id del producto
   * @returns {Product} - Producto buscado
   */
  async findOne(id: number): Promise<Product> {
    // Busca un producto
    return await this.productRepository.findOne(id);
  }

  /**
   * Actualiza un producto
   * @param {number} id - Id del producto 
   * @param {UpdateProductDto} updateProductDto - Dto del producto
   * @param {Express.Multer.File} file - Archivo de imagen del producto 
   * @returns {Product} - Producto buscado
   */
  async update(id: number, updateProductDto: UpdateProductDto, fileName: string): Promise<Product> {
    // Si hay un archivo de imagen para actualizar el producto, eliminamos la imagen anterior si existe
    if (fileName) {
      const oldImage = (await this.productRepository.findOne(id)).image;
      if (oldImage) {
        this.storageService.deleteFile(this.storageService.imagesDestination, oldImage);
      }
    }

    // Peticion para actualizar el producto en la base de datos
    return await this.productRepository.update(id, {
      ...updateProductDto,
      image: fileName,
    });
  }

  /**
   * Elimina un producto por id
   * @param {number} id - Id del producto 
   * @returns {Product} - Producto eliminado
   */
  async remove(id: number): Promise<Product> {
    // Peticion para eliminar el producto de la base de datos 
    const product = await this.productRepository.remove(id);

    // Elimina del servidor el arhivo de imagen si este existe
    if (product && product.image) {
      this.storageService.deleteFile(this.storageService.imagesDestination, product.image);
    }
    return product;
  }
}
