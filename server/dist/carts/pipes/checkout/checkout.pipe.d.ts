import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';
import { CheckoutCartDto } from 'src/carts/dto/checkout-cart.dto';
import { UsersService } from 'src/users/users.service';
export declare class CheckoutPipe implements PipeTransform {
    private readonly req;
    private readonly usersService;
    private readonly addressesService;
    constructor(req: any, usersService: UsersService, addressesService: AddressesService);
    transform(checkoutCartDto: CheckoutCartDto, metadata: ArgumentMetadata): Promise<CheckoutCartDto>;
}
