import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

/**
 * Data Transfer Object para la actualización de datos de un usuario
 */
export class UpdateUserDto extends PartialType(CreateUserDto){

}