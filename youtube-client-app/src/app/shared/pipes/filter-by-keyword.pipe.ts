import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchItem } from '../models/search-item';

@Pipe({
  name: 'filterByKeyword',
})
export class FilterByKeywordPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(searchItems: Observable<SearchItem[]>, searchQuery: string): Observable<SearchItem[]> {
    return searchItems.pipe(
      map((items) => items.filter((item) => item.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }
}
