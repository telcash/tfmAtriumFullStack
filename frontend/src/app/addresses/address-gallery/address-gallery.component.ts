import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { Address } from '../models/address';

/**
 * Componente que gestiona la galería de direcciones de un usuario
 */
@Component({
  selector: 'app-address-gallery',
  templateUrl: './address-gallery.component.html',
  styleUrls: ['./address-gallery.component.css']
})
export class AddressGalleryComponent implements OnInit {

  addresses: Address[] = [];

  constructor(
    private addressesService: AddressesService,
  ) {}

  /**
   * Invoca al servicio para la solicitud al API de las direcciones del usuario
   * Inicializa el atributo addresses del componente
   */
  ngOnInit(): void {

    this.addressesService.getAddresses().subscribe(
      data => this.addresses = data,
    )
  }

  /**
   * Elimina una dirección del atributo addresses
   * @param {number} addressId - Id de la dirección a eliminar
   */
  addressDeleted(addressId: number): void {
    this.addresses.splice(this.addresses.findIndex(address => address.id === addressId), 1);
  }
}
