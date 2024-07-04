import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchItem } from '../interfaces/search-item';
import { mockSearchResponse } from '../mock';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchItems: Observable<SearchItem[]> = of(mockSearchResponse.items);

  performSearchByValue(value: string): Observable<SearchItem[]> {
    // eslint-disable-next-line no-return-assign
    return (this.searchItems = of(
      mockSearchResponse.items.filter((item) => item.snippet.title.toLowerCase().includes(value.toLowerCase()))
    ));
  }
}
