export interface SearchItem {
  isCustom?: boolean;
  kind: string;
  etag: string;
  id:
    | string
    | {
        kind: string;
        videoId: string;
      };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: ItemThumbnail;
      medium: ItemThumbnail;
      high: ItemThumbnail;
      standard: ItemThumbnail;
      maxres: ItemThumbnail;
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage?: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

interface ItemThumbnail {
  url: string;
  width: number;
  height: number;
}
