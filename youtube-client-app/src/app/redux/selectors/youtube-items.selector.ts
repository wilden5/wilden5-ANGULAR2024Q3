import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectVideoItems = createSelector(selectAppState, (state) => state.videoItems);

export const selectYoutubeItemsSortedByViewCountAsc = createSelector(selectVideoItems, (state) => {
  const values = Object.values(state);
  return [...values].sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
});

export const selectYoutubeItemsSortedByViewCountDesc = createSelector(selectVideoItems, (state) => {
  const values = Object.values(state);
  return [...values].sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
});

export const selectYoutubeItemsSortedByDateAsc = createSelector(selectVideoItems, (state) => {
  const values = Object.values(state);
  return [...values].sort(
    (a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime()
  );
});

export const selectYoutubeItemsSortedByDateDesc = createSelector(selectVideoItems, (state) => {
  const values = Object.values(state);
  return [...values].sort(
    (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
  );
});
