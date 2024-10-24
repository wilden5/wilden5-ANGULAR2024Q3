import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { itemsReducer } from '../reducers/items.reducer';
import { SearchItem } from '../../youtube/models/search-item';
import { LOAD_YOUTUBE_ITEMS } from '../actions/youtube-items.actions';
import { ADD_CUSTOM_ITEM } from '../actions/custom-items.actions';
import { selectAllItems } from './items.selector';

describe('items selector', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          appState: itemsReducer,
        }),
      ],
    });
    store = TestBed.inject(Store);
  });

  it('should select all items', (done) => {
    const customItem: Partial<SearchItem> = { id: 'id-1' };
    const youtubeItems = [{ id: 'id-2' }, { id: 'id-3' }];

    store.dispatch(LOAD_YOUTUBE_ITEMS({ youtubeItems: youtubeItems as SearchItem[] }));
    store.dispatch(ADD_CUSTOM_ITEM({ customItem: customItem as SearchItem }));

    store.select(selectAllItems).subscribe((items) => {
      expect(items).toEqual([{ id: 'id-1' }, { id: 'id-2' }, { id: 'id-3' }]);
      done();
    });
  });
});
