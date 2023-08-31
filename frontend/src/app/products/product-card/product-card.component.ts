import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../models/product';
import { FormControl } from '@angular/forms';
import { CartsService } from 'src/app/carts/carts.service';
import { GlobalConstants } from 'src/app/config/global-constants';

/**
 * Componente que gestiona la vista de una tarjeta de un producto
 */
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  // Dirección en el API de la imagen del producto
  imgUrl = '';

  // Atributo de entrada con los datos del producto
  @Input() product!: Product;

  // Atributo de salida que emite un evento de cambio de cantidad del producto
  @Output() cartItemQuantityChange = new EventEmitter<Product>();

  // Campo de formulario con la cantidad del producto que se desea agregar al carrito
  quantity = new FormControl<number>(1, {nonNullable: true});

  // Cantidad máxima del producto disponible para el usuario
  maxItems = 0;

  // Cantidad del producto en el carrito del usuario
  cartItemQuantity = 0;

  constructor(private cartsService: CartsService) {
  }
  
  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // Inicializa la dirección de la imagen del producto
    this.imgUrl = `${GlobalConstants.API_STATIC_PRODUCTS_IMG}/${this.product?.image}`;

    // Actualiza los atributos cartItemQuantity y maxItems
    if (this.product.cartsItem && this.product.cartsItem.length >0) {
      this.cartItemQuantity = this.product.cartsItem[0].quantity
    }
    this.maxItems = this.product.stock - this.cartItemQuantity;
  }

  /**
   * Método que agrega una cantidad del producto al carrito del cliente
   */
  addToCart() {

    // LLamada al servicio para solicitud al API de agregar un item al carrito
    this.cartsService.addItemToCart(this.product.id, this.quantity.value).subscribe(
      cartItem => {

        // Actualiza el item del producto en el carrito
        this.product.cartsItem = [cartItem]

        // Actualiza el atributo maxItems
        this.maxItems = this.product.stock - cartItem.quantity;

        // Establece la cantidad en el formulario en 1
        this.quantity.setValue(1);

        // Envía al componente padre un evento con el producto que se actualizó su cantidad en el carrito
        this.cartItemQuantityChange.emit(this.product);
      }
    )
  }

}
