import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, concatMap, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { SearchItem } from '../models/search-item';
import { SearchResponse } from '../models/search-response';
import { SET_PAGE_TOKENS } from '../../redux/actions/youtube-items.actions';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  performSearchByValue(value: string, pageToken = ''): Observable<SearchItem[]> {
    return this.http.get<SearchResponse>(`search?maxResults=20&q=${value}&pageToken=${pageToken}`).pipe(
      tap((response) => {
        this.store.dispatch(
          SET_PAGE_TOKENS({ nextPageToken: response.nextPageToken, prevPageToken: response.prevPageToken || '' })
        );
      }),
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
