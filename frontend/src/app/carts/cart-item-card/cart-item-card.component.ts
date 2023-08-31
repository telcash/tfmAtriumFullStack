import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/products/models/product';
import { FormControl } from '@angular/forms';
import { CartsService } from '../carts.service';
import { GlobalConstants } from 'src/app/config/global-constants';
import { concatMap, tap } from 'rxjs';

/**
 * Componente que gestiona un item de un carrito
 */
@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {
  
  // Valor inicial de entrada del item
  @Input() cartItem!: CartItem;

  // Valores de salida (eventos emitidos)
  @Output() itemDeleted = new EventEmitter<CartItem>();
  @Output() itemUpdated = new EventEmitter<CartItem>();

  // Url de la imagen correspondiente al item
  imgUrl!: string;

  // Cantidad máxima del item que puede seleccionar el usuario
  maxItems?: number;

  // Producto correspondiente al item 
  product?: Product;
  
  // Campo de formulario para seleccionar la cantidad del item en el carrito
  quantity = new FormControl(1, {nonNullable: true});
  
  constructor(
    private cartsService: CartsService,
    private productsService: ProductsService,
  ) {}

  /**
   * Configuración inicial del componente
   */
  ngOnInit(): void {

    // Inicializa la cantidad seleccionada en el formulario a la cantidad del item de entrada
    this.quantity.setValue(this.cartItem.quantity);

    // Llamada al servicio para solicitar al API el producto correspondiente al item
    this.productsService.getProduct(this.cartItem.productId).pipe(
      tap(
        product =>{

          // Inicializa el producto correpondiente al item
          this.product = product;

          // Mapeo de la dirección de imagen en API
          this.imgUrl = `${GlobalConstants.API_STATIC_PRODUCTS_IMG}/${this.product.image}`;
        }
      ),

      // Observa cambios en el valor de la cantidad del item elegida en el formulario
      concatMap(
        () => this.quantity.valueChanges,
      ),
      concatMap(

        // Llamada al servicio para solicitar al API la actualizacion de la cantidad del item
        quantity => this.cartsService.updateItem(this.product!.id, quantity).pipe(
          tap(

            // Emision de evento para componente padre, con el item modificado con la nueva cantidad
            () => this.itemUpdated.emit({...this.cartItem, quantity: quantity}),
          )
        )
      ),
    ).subscribe();

  }

  /**
   * Método que gestiona la eliminación de un item del inventario
   */
  delete() {

    // Llamada al servicio para solicitar al API la eliminación del item
    this.cartsService.deleteItem(this.cartItem.productId).subscribe(
      
      // Emision de evento para componente padre, con el item eliminado
      cartItem => this.itemDeleted.emit(cartItem),
    );
  }

}
