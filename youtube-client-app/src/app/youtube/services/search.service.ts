import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, concatMap, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from '../models/search-item';
import { SearchResponse } from '../models/search-response';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  performSearchByValue(value: string): Observable<SearchItem[]> {
    return this.http.get<SearchResponse>(`search?maxResults=20&q=${value}`).pipe(
      concatMap((response) => {
        const videoIds = response.items.map((item) => (item.id as { videoId: string }).videoId).join(',');
        return this.getYoutubeItemsByIds(videoIds);
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
}
