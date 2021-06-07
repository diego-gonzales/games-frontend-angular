import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(value: string): string {
    if (value === '') return 'assets/img/no-image.png'
    else if ( !value.startsWith('https://') && !value.startsWith('http://') ) return 'assets/img/no-image.png'

    return value;
  }

}
