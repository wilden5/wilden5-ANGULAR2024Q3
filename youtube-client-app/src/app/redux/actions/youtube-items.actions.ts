import { createAction, props } from '@ngrx/store';
import { SearchItem } from '../../youtube/models/search-item';

export const SEARCH_YOUTUBE_ITEMS_BY_QUERY = createAction(
  '[YOUTUBE] Get Youtube Items By Query',
  props<{ searchQuery: string }>()
);

export const SORT_YOUTUBE_ITEMS = createAction('[YOUTUBE] Sort Youtube Items', props<{ youtubeItems: SearchItem[] }>());

export const LOAD_YOUTUBE_ITEMS = createAction('[YOUTUBE] Load Youtube Items', props<{ youtubeItems: SearchItem[] }>());
