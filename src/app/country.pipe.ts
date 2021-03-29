import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    console.log(value);
    if(value.length==0){
      return 'No Country Selected';
    }else 
      return value.length + " country selected";
  
  }

}
