import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingresoEgreso';

@Pipe({
  name: 'sortIE'
})
export class SortIEPipe implements PipeTransform {

  data: IngresoEgreso[];

  transform(montos: IngresoEgreso[]): IngresoEgreso[] {
    this.data = [];
    montos.forEach(monto => {
      if (monto.tipo === 'I') {
        this.data.unshift(monto);
      } else {
        this.data.push(monto);
      }
    })
    return this.data;
  }

}
