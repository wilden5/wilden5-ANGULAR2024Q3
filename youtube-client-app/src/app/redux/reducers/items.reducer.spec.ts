import { Action } from '@ngrx/store';
import { initialState, itemsReducer } from './items.reducer';
import { SearchItem } from '../../youtube/models/search-item';
import { ADD_ITEM_TO_FAVORITE_LIST, LOAD_YOUTUBE_ITEMS, SORT_YOUTUBE_ITEMS } from '../actions/youtube-items.actions';
import { ADD_CUSTOM_ITEM, DELETE_CUSTOM_ITEM } from '../actions/custom-items.actions';

describe('item reducer', () => {
  it('should return the initial state', () => {
    const action: Action = { type: 'unknown' };
    const state = itemsReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should load youtube items', () => {
    const youtubeItems = [{ id: '1' }, { id: '2' }];
    const state = itemsReducer(initialState, LOAD_YOUTUBE_ITEMS({ youtubeItems: youtubeItems as SearchItem[] }));

    expect(state.videoListIds).toEqual(['1', '2']);
  });

  it('should sort youtube items without changing videoItems order', () => {
    const youtubeItems = [{ id: '1' }, { id: '2' }];
    const sortedYoutubeItemsMock = [{ id: '2' }, { id: '1' }];
    let state = itemsReducer(initialState, LOAD_YOUTUBE_ITEMS({ youtubeItems: youtubeItems as SearchItem[] }));
    state = itemsReducer(state, SORT_YOUTUBE_ITEMS({ youtubeItems: sortedYoutubeItemsMock as SearchItem[] }));

    expect(state.videoItems).toEqual({ '1': { id: '1' }, '2': { id: '2' } });
  });

  it('should add custom item to store', () => {
    const customItem: Partial<SearchItem> = { id: 'custom1' as string };
    const state = itemsReducer(initialState, ADD_CUSTOM_ITEM({ customItem: customItem as SearchItem }));

    expect(state.customItems).toEqual({ custom1: { id: 'custom1' } });
  });

  it('should delete custom item from store', () => {
    const customItem: Partial<SearchItem> = { id: 'custom1' as string };
    let state = itemsReducer(initialState, ADD_CUSTOM_ITEM({ customItem: customItem as SearchItem }));
    state = itemsReducer(state, DELETE_CUSTOM_ITEM({ id: 'custom1' }));

    expect(state.customItems).toEqual({});
  });

  it('should add youtube item to favorite list', () => {
    const youtubeItems = [{ id: '1' }, { id: '2' }];
    let state = itemsReducer(initialState, LOAD_YOUTUBE_ITEMS({ youtubeItems: youtubeItems as SearchItem[] }));
    state = itemsReducer(state, ADD_ITEM_TO_FAVORITE_LIST({ id: '1' }));

    expect(state.favoriteListIds).toEqual(['1']);
  });
});
