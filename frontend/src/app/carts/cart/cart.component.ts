import { Component, OnInit, inject } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartsService } from '../carts.service';
import { Router } from '@angular/router';
import { Observable, concat, concatMap, filter, map, shareReplay, tap } from 'rxjs';
import { AddressesService } from 'src/app/addresses/addresses.service';
import { Address } from 'src/app/addresses/models/address';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

/**
 * Componente que gestiona el carrito de compras de un usuario
 */
@Component({
  selector: 'app-carts',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // BreakpointObserver para capturar cambios en el tamaño de pantalla y ajustar la vista
  private breakpointObserver = inject(BreakpointObserver);
  isSmall: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1024px)').pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  // Listado de items en el carrito
  cartItems: CartItem[] = [];

  // Monto total del carrito
  total?: number;

  // Campo de formulario para selección de dirección del usuario
  selectAddress = new FormControl<Address | null>(null);

  // Listado de direcciones del usuario
  addresses: Address[] = [];

  isUserLogged = false;

  constructor(
    private cartsService: CartsService,
    private addressesService: AddressesService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    // Verifica si hay un usuario con sesión iniciada
    this.isUserLogged = this.authService.isUserLogged();

    // Carga inicial de datos
    concat(

      // Llamada al servicio para la solicitud al API del carrito de usuario
      this.cartsService.findCart().pipe(
        tap(

          // Carrito obtenido
          cart => {

            // Inicializa el monto total del carrito
            this.total = cart.total;

            // Inicializa el formulario con la dirección en el carrito obtenido si la tiene
            this.selectAddress.setValue(cart.address ? cart.address : null);

            // Inicializa el listado de items en el carrito
            this.cartItems = cart.items;
          }
        )
      ),

      // LLamada al servicio para la solicitud al API de las direcciones del usuario
      this.addressesService.getAddresses().pipe(
        tap(

          // Inicializa el listado de direcciones del usuario
          addresses => this.addresses = addresses,
        ),
        filter(

          // Continua el flujo de datos si el listado de direcciones no está vacío y el formulario de direcciones está sin inicializar
          addresses => addresses.length > 0 && this.selectAddress.value === null,
        ),
        map(

          addresses => {
            // Inicializa el formulario de dirección con la primera dirección del listado
            this.selectAddress.setValue(addresses[0]);
            
            // Retorna el id de la dirección que esté en el formulario
            return this.selectAddress.value?.id;
          } 
        ),
        concatMap(

          // Llamada al servicio para la solicitud al API de actualización del carrito con la nueva dirección
          id => this.cartsService.updateCart({ addressId: id }) 
        )
      ),

      // Observamos el formulario de direcciones por cambios en su valor
      this.selectAddress.valueChanges.pipe(
        concatMap(

          //Si hay cambios, llama al servicio para la solicitud al API de actualización del carrito con la nueva dirección
          address => this.cartsService.updateCart({addressId: address?.id }),
        )
      )
    ).subscribe();

  }
  
  /**
   * Método que se ejecuta cuando un componente hijo, de clase CartItemCard emite un evento itemDeleted
   * Elimina un item del carrito
   * @param {CartItem} cartItem - Item a eliminar
   */
  itemDeleted(cartItem: CartItem) {

    // Busca el item en el listado y lo elimina
    this.cartItems.splice(this.cartItems.findIndex(item => item.productId === cartItem.productId), 1);
    
    // Actualiza el total del carrito
    this.updateTotal();
  }

  /**
   * Método que se ejecuta cuando un componente hijo, de clase CartItemCard emite un evento itemUpdated
   * Actualiza un item del carrito
   * @param {CartItem} cartItem - Item a actualizar
   */
  itemUpdated(cartItem: CartItem) {

    // Busca el indice del item a actualizar
    const index = this.cartItems.findIndex(item => item.productId === cartItem.productId);
    
    // Actualiza el item
    this.cartItems[index].quantity = cartItem.quantity;

    // Actualiza el total del carrito
    this.updateTotal();
  }

  /**
   * Método que actualiza el monto total del carrito
   */
  updateTotal() {
    let newTotal = 0;

    // Suma consecutiva de los productos de cada item por su precio
    for(const item of this.cartItems) {
      newTotal += item.quantity * item.price
    }

    // Actualiza el total
    this.total = newTotal;
  }

  /**
   * Método que ejecuta el procesamiento de compra de un carrito
   */
  checkout() {

    // Llamada al servicio para la solicitud al API de procesamiento de compra de un carrito
    this.cartsService.checkout(this.selectAddress.value!.id!).subscribe(

      // Navega a la página de checkout con el parámetro de id de la nueva orden generada
      orderId => this.router.navigateByUrl(`checkout/${orderId}`),
    );
  }

  /**
   * Diálogo de confirmación oara el procesamiento de compra de un carrito
   */
  openCheckoutDialog() {

    // Crea el componente que genera el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Tramitar',
        question: '¿Desea tramitar el pedido?. Ya no podra realizar cambios en la orden.',
      },
      ...confirmDialogOptions,
    })

    // Si el diálogo confirma el procesamiento de la compra invoca el método checkout()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.checkout();
      }
    })
  }

  // Actualiza la dirección a null para controlar la vista del carrito
  setSelectedAddressToNull() {
    this.selectAddress.setValue(null);
  }

}
