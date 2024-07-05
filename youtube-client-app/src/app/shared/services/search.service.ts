import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SearchItem } from '../interfaces/search-item';
import { mockSearchResponse } from '../mock';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchItems: Observable<SearchItem[]> = of([]);

  searchByDateAscending = false;

  searchByViewsAscending = false;

  performSearchByValue(value: string): Observable<SearchItem[]> {
    return (this.searchItems = of(
      mockSearchResponse.items.filter((item) => item.snippet.title.toLowerCase().includes(value.toLowerCase()))
    ));
  }

  performSearchByDate(): Observable<SearchItem[]> {
    this.searchByDateAscending = !this.searchByDateAscending;
    if (this.searchByDateAscending) {
      return (this.searchItems = this.searchItems.pipe(
        map((result) =>
          result.sort((a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime())
        )
      ));
    }
    return (this.searchItems = this.searchItems.pipe(
      map((result) =>
        result.sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime())
      )
    ));
  }

  performSearchByViews(): Observable<SearchItem[]> {
    this.searchByViewsAscending = !this.searchByViewsAscending;
    if (this.searchByViewsAscending) {
      return (this.searchItems = this.searchItems.pipe(
        map((result) => result.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount)))
      ));
    }
    return (this.searchItems = this.searchItems.pipe(
      map((result) => result.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount)))
    ));
  }
}
