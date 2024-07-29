import { createAction, props } from '@ngrx/store';
import { SearchItem } from '../../youtube/models/search-item';

export const ADD_CUSTOM_ITEM = createAction('[CUSTOM ITEM] Add Custom Item', props<{ customItem: SearchItem }>());

export const DELETE_CUSTOM_ITEM = createAction('[CUSTOM ITEM] Delete Custom Item', props<{ id: string }>());
