import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../models/address';
import { AddressesService } from '../addresses.service';
import { Router } from '@angular/router';

/**
 * Componente que muestra el formulario para la creación de una dirección de un usuario
 */
@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent {

  // Definición del formulario para la creación de la dirección con validaciones
  addressCreateForm = new FormGroup({
    'street': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    'postalCode': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    'city': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    'country': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  constructor(
    private addressesService: AddressesService,
    private router: Router,
  ) {}

  /**
   * Envía los datos del formulario para la creación de la dirección
   */
  onSubmit(): void {

    // Objeto con los datos del formulario para el envío al API
    const address: Address = {
      street: this.addressCreateForm.value.street!,
      postalCode: this.addressCreateForm.value.postalCode!,
      city: this.addressCreateForm.value.city!,
      country: this.addressCreateForm.value.country!,
    }

    // LLamada al servicio para la solicitud al API de la creación de la dirección
    this.addressesService.createAddress(address).subscribe(
      
      // Una vez creada la dirección navega al listado de las direcciones del usuario
      () => this.goToAddresses(),

    );
  }

  /**
   * Navega al listado de las direcciones del usuario
   */
  goToAddresses() {
    this.router.navigateByUrl('users/myprofile/addresses');
  }

}
