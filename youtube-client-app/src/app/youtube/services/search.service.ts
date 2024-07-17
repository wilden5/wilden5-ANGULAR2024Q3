import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from '../models/search-item';
import { mockSearchResponse } from '../../shared/mock';
import { FilterByKeywordPipe } from '../../shared/pipes/filter-by-keyword.pipe';
import { SearchResponse } from '../models/search-response';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchItems: Observable<SearchItem[]> = of([]);

  filteredSearchItems: Observable<SearchItem[]> = of([]);

  searchByDateAscending = false;

  searchByViewsAscending = false;

  searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private filterByKeywordPipe: FilterByKeywordPipe
  ) {}

  performSearchByValue(value: string): Observable<SearchItem[]> {
    this.searchItems = of(
      mockSearchResponse.items.filter((item) => item.snippet.title.toLowerCase().includes(value.toLowerCase()))
    );
    return (this.filteredSearchItems = this.searchItems);
  }

  performSearchByValueYoutube(value: string): Observable<SearchItem[]> {
    return this.http.get<SearchResponse>(`search?maxResults=20&q=${value}`).pipe(
      map((response) => response.items),
      tap((data) => {
        console.log('im here in tap');
        console.log(data);
        // add method for retrieving of data for specific  youtube video
      })
    );
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
