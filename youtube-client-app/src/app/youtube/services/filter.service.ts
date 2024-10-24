import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchItem } from '../models/search-item';
import { FilterByKeywordPipe } from '../../shared/pipes/filter-by-keyword.pipe';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  isFilterMenu: boolean = false;

  isFilterByDateAscending = false;

  isFilterByViewsAscending = false;

  constructor(
    private searchService: SearchService,
    private filterByKeywordPipe: FilterByKeywordPipe
  ) {}

  toggleFilterPanel(): void {
    this.isFilterMenu = !this.isFilterMenu;
  }

  performFilterByDate(): Observable<SearchItem[]> {
    this.isFilterByDateAscending = !this.isFilterByDateAscending;
    if (this.isFilterByDateAscending) {
      return (this.searchService.filteredSearchItems = this.searchService.filteredSearchItems.pipe(
        map((result) =>
          result.sort((a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime())
        )
      ));
    }
    return (this.searchService.filteredSearchItems = this.searchService.filteredSearchItems.pipe(
      map((result) =>
        result.sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime())
      )
    ));
  }

  performFilterByViews(): Observable<SearchItem[]> {
    this.isFilterByViewsAscending = !this.isFilterByViewsAscending;
    if (this.isFilterByViewsAscending) {
      return (this.searchService.filteredSearchItems = this.searchService.filteredSearchItems.pipe(
        map((result) => result.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount)))
      ));
    }
    return (this.searchService.filteredSearchItems = this.searchService.filteredSearchItems.pipe(
      map((result) => result.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount)))
    ));
  }

  performFilterByKeyword(searchQuery: string): Observable<SearchItem[]> {
    return (this.searchService.filteredSearchItems = this.filterByKeywordPipe.transform(
      this.searchService.searchItems,
      searchQuery
    ));
  }
}
