// eslint-disable-next-line import/no-extraneous-dependencies
import { concatLatestFrom } from '@ngrx/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  LOAD_NEXT_YOUTUBE_PAGE,
  LOAD_PREV_YOUTUBE_PAGE,
  LOAD_YOUTUBE_ITEMS,
  SEARCH_YOUTUBE_ITEMS_BY_QUERY,
} from '../actions/youtube-items.actions';
import { SearchService } from '../../youtube/services/search.service';
import { selectNextPageToken, selectPrevPageToken } from '../selectors/youtube-items.selector';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private store: Store
  ) {}

  searchYoutubeItems = createEffect(() => {
    return this.actions$.pipe(
      ofType(SEARCH_YOUTUBE_ITEMS_BY_QUERY),
      mergeMap((action) =>
        this.searchService.performSearchByValue(action.searchQuery).pipe(
          map((youtubeItems) => LOAD_YOUTUBE_ITEMS({ youtubeItems })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  loadPrevYoutubePage = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_PREV_YOUTUBE_PAGE),
      concatLatestFrom(() => this.store.select(selectPrevPageToken)),
      switchMap(([, prevPageToken]) => {
        return this.searchService.performSearchByValue(this.searchService.searchQuery.getValue(), prevPageToken);
      }),
      map((youtubeItems) => LOAD_YOUTUBE_ITEMS({ youtubeItems })),
      catchError(() => EMPTY)
    );
  });

  loadNextYoutubePage = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_NEXT_YOUTUBE_PAGE),
      concatLatestFrom(() => this.store.select(selectNextPageToken)),
      switchMap(([, nextPageToken]) => {
        return this.searchService.performSearchByValue(this.searchService.searchQuery.getValue(), nextPageToken);
      }),
      map((youtubeItems) => LOAD_YOUTUBE_ITEMS({ youtubeItems })),
      catchError(() => EMPTY)
    );
  });
}
