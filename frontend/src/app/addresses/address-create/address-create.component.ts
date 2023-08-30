import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

    if (this.addressCreateForm.valid) {
      // LLamada al servicio para la solicitud al API de la creación de la dirección
      this.addressesService.createAddress(this.addressCreateForm.getRawValue()).subscribe(
        
        // Una vez creada la dirección navega al listado de las direcciones del usuario
        () => this.router.navigateByUrl('users/myprofile/addresses'),
  
      );
    }

  }

}
