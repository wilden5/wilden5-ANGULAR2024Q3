import { createAction, props } from '@ngrx/store';
import { SearchItem } from '../../youtube/models/search-item';

export const SEARCH_YOUTUBE_ITEMS_BY_QUERY = createAction(
  '[YOUTUBE] Search Youtube Items By Query',
  props<{ searchQuery: string }>()
);

export const SORT_YOUTUBE_ITEMS = createAction('[YOUTUBE] Sort Youtube Items', props<{ youtubeItems: SearchItem[] }>());

export const LOAD_YOUTUBE_ITEMS = createAction('[YOUTUBE] Load Youtube Items', props<{ youtubeItems: SearchItem[] }>());

export const LOAD_NEXT_YOUTUBE_PAGE = createAction('[YOUTUBE] Load Next Youtube Page');

export const LOAD_PREV_YOUTUBE_PAGE = createAction('[YOUTUBE] Load Prev Youtube Page');

export const SET_PAGE_TOKENS = createAction(
  '[YOUTUBE] Set Page Tokens',
  props<{ nextPageToken: string; prevPageToken: string }>()
);

export const ADD_ITEM_TO_FAVORITE_LIST = createAction('[YOUTUBE] Add Item To Favorite List', props<{ id: string }>());

export const REMOVE_ITEM_FROM_FAVORITE_LIST = createAction(
  '[YOUTUBE] Remove Item From Favorite List',
  props<{ id: string }>()
);
