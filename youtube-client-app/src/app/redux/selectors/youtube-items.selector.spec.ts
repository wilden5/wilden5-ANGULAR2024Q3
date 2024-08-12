import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { ADD_CUSTOM_ITEM } from '../actions/custom-items.actions';
import { itemsReducer } from '../reducers/items.reducer';
import { selectCustomItems } from './items.selector';
import { SearchItem } from '../../youtube/models/search-item';
import { ADD_ITEM_TO_FAVORITE_LIST } from '../actions/youtube-items.actions';
import { selectSpecificFavoriteItem } from './youtube-items.selector';

describe('youtube items', () => {
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

  it('should select custom items', (done) => {
    const customItem1: Partial<SearchItem> = { id: 'id-1' };
    const customItem2: Partial<SearchItem> = { id: 'id-2' };

    store.dispatch(ADD_CUSTOM_ITEM({ customItem: customItem1 as SearchItem }));
    store.dispatch(ADD_CUSTOM_ITEM({ customItem: customItem2 as SearchItem }));

    store.select(selectCustomItems).subscribe((customItems) => {
      expect(customItems).toEqual({
        'id-1': customItem1,
        'id-2': customItem2,
      });
      done();
    });
  });

  it('should select specific favorite item', (done) => {
    const customItem1: Partial<SearchItem> = { id: 'id-1' };

    store.dispatch(ADD_ITEM_TO_FAVORITE_LIST({ id: customItem1.id as string }));

    store.select(selectSpecificFavoriteItem('id-1')).subscribe((item) => {
      expect(item).toBeTruthy();
      done();
    });
  });
});
