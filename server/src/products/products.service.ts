import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StorageService } from 'src/common/services/storage.service';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly storageService: StorageService
  ) {}

  /**
   * Crea un Producto
   * @param {CreateProductDto} createProductDto - Dto para crear el producto
   * @param {string} fileName - Nombre del archivo de imagen
   * @returns - Producto Creado
   */
  async create(createProductDto: CreateProductDto, fileName: string) {
    // Petición al repositorio para crear el producto
    return await this.productRepository.create({
      ...createProductDto,
      image: fileName,
    });
  }

  /**
   * Genera un listado de todos los productos disponibles para clientes
   * @returns - Listado de productos
   */
  async findAllForClients() {
    // Busca un listado de todos los productos disponibles para clientes
    return await this.productRepository.findAllForClients();
  }

  /**
   * Genera un listado de todos los productos
   * @returns - Listado de productos
   */
  async findAll() {
    // Busca un listado de todos los productos
    return await this.productRepository.findAll();
  }

  /**
   * Busca un producto por id si está disponible para clientes
   * @param {number} id - Id del producto 
   * @returns - Producto buscado
   */
  async findOneForClients(id: number) {
    // Busca un producto que este disponible para clientes
    return await this.productRepository.findOneForClients(id);
  }

  /**
   * Busca un producto por id
   * @param {number} id - Id del producto
   * @returns - Producto buscado
   */
  async findOne(id: number) {
    // Busca un producto
    return await this.productRepository.findOne(id);
  }

  /**
   * Actualiza un producto
   * @param {number} id - Id del producto 
   * @param {UpdateProductDto} updateProductDto - Dto del producto
   * @param {Express.Multer.File} file - Archivo de imagen del producto 
   * @returns - Producto buscado
   */
  async update(id: number, updateProductDto: UpdateProductDto, fileName: string) {
    // Si hay un archivo de imagen para actualizar el producto, eliminamos la imagen anterior si existe
    if (fileName) {
      const oldImage: string = (await this.productRepository.findOne(id)).image;
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
   * @returns - Producto eliminado
   */
  async remove(id: number): Promise<ProductEntity> {
    // Peticion para eliminar el producto de la base de datos 
    const product = await this.productRepository.remove(id);

    // Elimina del servidor el arhivo de imagen si este existe
    if (product && product.image) {
      this.storageService.deleteFile(this.storageService.imagesDestination, product.image);
    }
    return product;
  }
}
