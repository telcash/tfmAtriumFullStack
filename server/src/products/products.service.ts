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
  async create(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<Product> {
    // Nombre del archivo si hay, sino el nombre es null
    const fileName = file ? file.filename : null;

    // Actualiza el DTO
    createProductDto = {
      ...createProductDto,
      image: fileName,
    }

    // Petición al repositorio para crear el producto
    return await this.productRepository.create(createProductDto);
  }

  /**
   * Genera un listado de todos los productos
   * @param req - Request
   * @returns {Product[]} - Listado de productos
   */
  async findAll(req): Promise<Product[]> {
    // Si el usuario es ADMIN genera un listado sin condiciones
    if (req.isAdmin) {
      return await this.productRepository.findAll();
    }

    // Si el usuario no es Admin genera un listado con condiciones
    return await this.productRepository.findAllForClients();
  }

  /**
   * Busca un producto por id
   * @param {number} id - Id del producto
   * @param req - Request
   * @returns {Product} - Producto buscado
   */
  async findOne(id: number, req): Promise<Product> {
    // Si el usuario es ADMIN busca el producto sin condiciones
    if (req.isAdmin) {
      return await this.productRepository.findOne(id);
    }

    // Si el usuario no es ADMIN busca el producto con condiciones
    return await this.productRepository.findOneForClients(id);
  }

  /**
   * Actualiza un producto
   * @param {number} id - Id del producto 
   * @param {UpdateProductDto} updateProductDto - Dto del producto
   * @param {Express.Multer.File} file - Archivo de imagen del producto 
   * @returns {Product} - Producto buscado
   */
  async update(id: number, updateProductDto: UpdateProductDto, file: Express.Multer.File): Promise<Product> {
    if (file) {
      // Si hay nueva imagen, agregamos su nombre al Dto
      updateProductDto = {
        ...updateProductDto,
        image: file.filename,
      }
      // Si hay nueva imagen, eliminamos el archivo de la imagen anterior si existe
      const oldImage = (await this.productRepository.findOne(id)).image;
      if (oldImage) {
        this.storageService.deleteFile(this.storageService.imagesDestination, oldImage);
      }
    }
    return await this.productRepository.update(id, updateProductDto);
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
