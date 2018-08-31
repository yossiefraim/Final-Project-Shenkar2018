import { Pipe, PipeTransform } from '@angular/core';
import { Olders } from './services/olders';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Olders[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText;
    return items.filter( it => {
      return it.city.includes(searchText);
    });
   }

}
