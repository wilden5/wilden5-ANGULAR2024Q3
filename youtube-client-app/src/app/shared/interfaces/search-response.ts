export interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: string;
  nextPageToken: string;
  pervPageToken?: string;
}
