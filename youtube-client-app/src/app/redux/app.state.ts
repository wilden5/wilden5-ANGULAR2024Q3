import { SearchItem } from '../youtube/models/search-item';

export interface AppState {
  readonly videoItems: { [id: string]: SearchItem };
  readonly customItems: { [id: string]: SearchItem };
  readonly videoListIds: string[];
  readonly favoriteListIds: string[];
  readonly nextPageToken: string;
  readonly prevPageToken: string;
}
