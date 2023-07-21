import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

/**
 * Data transfer object oara la actualización de una dirección
 */
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
