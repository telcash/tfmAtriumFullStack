import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../models/address';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressesService } from '../addresses.service';

/**
 * Componente HTML que gestiona el formulario de edición de una dirección de usuario
 */
@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  // Definición del formulario de edición de la dirección de un usuario
  addressEditForm = new FormGroup({
    'street': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    'postalCode': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    'city': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    'country': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  address!: Address;
  addressId: number = this.route.snapshot.params['id'];

  constructor(
    private addressesService: AddressesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {} 

  /**
   * Invoca el método para la carga de los valores iniciales del formulario
   */
  ngOnInit(): void {
    this.loadInitialValues();
  }

  /**
   * Envía los datos del formulario para la edición de una dirección
   */
  onSubmit(): void {

    // Llamada al servicio para la solicitud al API de actualización de la dirección
    this.addressesService.updateAddress(this.addressId, this.addressEditForm.value).subscribe(

      // Una vez actualizada la dirección navega al listado de las direcciones del usuario
      () => this.goToAddresses(),
    );
  }

  /**
   * Carga los valores iniciales del formulario
   */
  loadInitialValues(): void {

    // Invoca al servicio para la solicitud al API de los datos de la dirección a editar
    this.addressesService.getAddress(this.addressId).subscribe(
      (data) => {

        // Inicializa el atributo address del componente
        this.address = data;

        // Inicializa los valores del formulario
        this.setFormValues(this.address);
      }
    )
  }

  /**
   * Método para establecer los valores de los campos del formulario
   * @param {Address} address 
   */
  setFormValues(address: Address) {
    this.addressEditForm.setValue({
      street: address.street,
      postalCode: address.postalCode,
      city: address.city,
      country: address.country,
    })
  }

  /**
   * Metodo para navegar al listado de direcciones del usuario
   */
  goToAddresses(): void {
    this.router.navigateByUrl('users/myprofile/addresses');
  }

}
