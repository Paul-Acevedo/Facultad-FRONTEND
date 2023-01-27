import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

//no tocar
export class FilterPipe implements PipeTransform {

    transform(items: any[], term:any,colum:any[]): any {
      
      let result:any = [];
     
      if (term == '') {
        return items;
      }
    
      for (let i = 0; i < colum.length; i++) {
        for (let item of items) {
         if (item[colum[i]]?.toLowerCase().indexOf(term.toLowerCase())  !== -1) {
            if (!result.includes(item)) {
              result.push(item);
            }
          }
        }
      }

      return result;
        // return term ? items.filter(item => item.DESCRIPCION.toLowerCase().indexOf(term.toLowerCase()) !== -1) : items;
    }
}

