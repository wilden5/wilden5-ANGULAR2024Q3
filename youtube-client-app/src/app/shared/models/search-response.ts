import { SearchItem } from './search-item';

export interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchItem[];
  nextPageToken?: string;
  pervPageToken?: string;
}
