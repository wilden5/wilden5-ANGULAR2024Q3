import { FormGroup } from '@angular/forms';
import { SearchItem } from '../youtube/models/search-item';

export function createNewCustomItem(formGroup: FormGroup): SearchItem {
  return {
    etag: 'custom-item-etag',
    id: {
      kind: 'custom-item-kind',
      videoId: `cv-id-${String(Math.floor(Math.random() * 9000))}`,
    },
    kind: 'youtube#video',
    snippet: {
      title: formGroup.value.title as string,
      publishedAt: formGroup.value.creationDate as string,
      description: formGroup.value.description as string,
      thumbnails: {
        medium: {
          url: formGroup.value.imageLink as string,
          height: 123,
          width: 223,
        },
        maxres: { url: '', height: 720, width: 1280 },
        default: { url: '', height: 720, width: 1280 },
        high: {
          url: formGroup.value.imageLink as string,
          height: 720,
          width: 1280,
        },
        standard: { url: '', height: 720, width: 1280 },
      },
      channelId: '',
      channelTitle: '',
      tags: [],
      categoryId: '',
      liveBroadcastContent: '',
      localized: {
        title: '',
        description: '',
      },
      defaultAudioLanguage: '',
    },
    statistics: {
      viewCount: String(Math.floor(Math.random() * 100000)),
      commentCount: String(Math.floor(Math.random() * 100)),
      dislikeCount: '',
      favoriteCount: String(Math.floor(Math.random() * 50)),
      likeCount: String(Math.floor(Math.random() * 1000)),
    },
  };
}
