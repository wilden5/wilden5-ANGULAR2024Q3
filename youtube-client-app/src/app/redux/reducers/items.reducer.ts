import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.state';
import { LOAD_YOUTUBE_ITEMS, SORT_YOUTUBE_ITEMS } from '../actions/youtube-items.actions';
import { ADD_CUSTOM_ITEM, DELETE_CUSTOM_ITEM } from '../actions/custom-items.actions';

export const initialState: AppState = {
  videoItems: {},
  customItems: {},
  videoListIds: [],
  favoriteListIds: [],
};

export const itemsReducer = createReducer(
  initialState,
  on(LOAD_YOUTUBE_ITEMS, (state, { youtubeItems }) => {
    const videoItems = youtubeItems.reduce(
      (acc, item) => ({
        ...acc,
        [item.id as string]: item,
      }),
      {}
    );
    const videoListIds = youtubeItems.map((item) => item.id as string);
    return { ...state, videoItems, videoListIds };
  }),
  on(SORT_YOUTUBE_ITEMS, (state, { youtubeItems }) => {
    const videoListIds = youtubeItems.map((item) => String(item.id));
    return { ...state, videoListIds };
  }),
  on(ADD_CUSTOM_ITEM, (state, { customItem }) => {
    return {
      ...state,
      customItems: { ...state.customItems, [customItem.id as string]: customItem },
    };
  }),
  on(DELETE_CUSTOM_ITEM, (state, { id }) => {
    const { [id]: itemToDelete, ...items } = state.customItems;
    return {
      ...state,
      customItems: items,
    };
  })
);
