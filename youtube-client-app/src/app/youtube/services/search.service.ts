import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SearchItem } from '../../shared/models/search-item';
import { mockSearchResponse } from '../../shared/mock';
import { FilterByKeywordPipe } from '../../shared/pipes/filter-by-keyword.pipe';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchItems: Observable<SearchItem[]> = of([]);

  filteredSearchItems: Observable<SearchItem[]> = of([]);

  searchByDateAscending = false;

  searchByViewsAscending = false;

  constructor(private filterByKeywordPipe: FilterByKeywordPipe) {}

  performSearchByValue(value: string): Observable<SearchItem[]> {
    this.searchItems = of(
      mockSearchResponse.items.filter((item) => item.snippet.title.toLowerCase().includes(value.toLowerCase()))
    );
    return (this.filteredSearchItems = this.searchItems);
  }

  performSortByDate(): Observable<SearchItem[]> {
    this.searchByDateAscending = !this.searchByDateAscending;
    if (this.searchByDateAscending) {
      return (this.filteredSearchItems = this.filteredSearchItems.pipe(
        map((result) =>
          result.sort((a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime())
        )
      ));
    }
    return (this.filteredSearchItems = this.filteredSearchItems.pipe(
      map((result) =>
        result.sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime())
      )
    ));
  }

  performSortByViews(): Observable<SearchItem[]> {
    this.searchByViewsAscending = !this.searchByViewsAscending;
    if (this.searchByViewsAscending) {
      return (this.filteredSearchItems = this.filteredSearchItems.pipe(
        map((result) => result.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount)))
      ));
    }
    return (this.filteredSearchItems = this.filteredSearchItems.pipe(
      map((result) => result.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount)))
    ));
  }

  performFilterByKeyword(searchQuery: string): Observable<SearchItem[]> {
    return (this.filteredSearchItems = this.filterByKeywordPipe.transform(this.searchItems, searchQuery));
  }

  selectItemById(id: string): Observable<SearchItem> {
    return this.searchItems.pipe(map((result) => result.find((item) => item.id === id))) as Observable<SearchItem>;
  }
}
