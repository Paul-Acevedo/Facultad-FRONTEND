import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrofecha'
})

//no tocar
export class FilterPipez implements PipeTransform {

    
      transform(row: any, f1: Date, f2: Date): any {
          //f1.toString().length == 0 ? f1 = new Date() : f1;
        //f2.toString().length == null ? f2 = new Date() : f2; 
        if (f1 >= f2 || f1 == null) {  return row;}
        console.log(f1);
        let result = row.filter((x:any)=> (new Date(x.FECHA) >= new Date(f1) && (new Date(x.FECHA) <= new Date(f2))));
  
        return result
      }

     
        // return term ? items.filter(item => item.DESCRIPCION.toLowerCase().indexOf(term.toLowerCase()) !== -1) : items;
    
}

