import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { LOAD_YOUTUBE_ITEMS, SEARCH_YOUTUBE_ITEMS_BY_QUERY } from '../actions/youtube-items.actions';
import { SearchService } from '../../youtube/services/search.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
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
}
