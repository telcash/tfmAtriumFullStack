import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateAddressPipe implements PipeTransform {

  userId: number;
  
  transform(value: any, metadata: ArgumentMetadata) {
    if( metadata.data === 'sub') {
      this.userId = value;
    } else {
      value = {...value, userId: this.userId}
    }

    return value;
  }
}
