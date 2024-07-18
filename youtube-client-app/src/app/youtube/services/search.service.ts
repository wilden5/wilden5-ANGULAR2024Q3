import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, concatMap, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from '../models/search-item';
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
    return this.http.get<SearchResponse>(`search?maxResults=20&q=${value}`).pipe(
      concatMap((response) => {
        const videoIds = response.items.map((item) => (item.id as { videoId: string }).videoId).join(',');
        return this.getYoutubeItemsByIds(videoIds);
      }),
      tap((data) => {
        this.searchItems = of(data);
        this.filteredSearchItems = this.searchItems;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getYoutubeItemsByIds(ids: string): Observable<SearchItem[]> {
    return this.http.get<SearchResponse>(`videos?part=snippet,statistics&id=${ids}`).pipe(
      map((response) => response.items),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getSpecificYoutubeItemById(id: string): Observable<SearchItem> {
    return this.http.get<SearchResponse>(`videos?part=snippet,statistics&id=${id}`).pipe(
      map((response) => response.items[0]),
      catchError((error) => {
        return throwError(() => error);
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

  // currently is not in use
  selectItemById(id: string): Observable<SearchItem> {
    return this.searchItems.pipe(map((result) => result.find((item) => item.id === id))) as Observable<SearchItem>;
  }
}
