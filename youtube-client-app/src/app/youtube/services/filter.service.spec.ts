import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { FilterService } from './filter.service';
import { FilterByKeywordPipe } from '../../shared/pipes/filter-by-keyword.pipe';
import { itemsReducer } from '../../redux/reducers/items.reducer';

describe('filter service', () => {
  let filterService: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          appState: itemsReducer,
        }),
      ],
      providers: [FilterByKeywordPipe],
    });
    filterService = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(filterService).toBeTruthy();
  });

  it('should toggle filter panel', () => {
    expect(filterService.isFilterMenu).toBeFalsy();
    filterService.toggleFilterPanel();
    expect(filterService.isFilterMenu).toBeTruthy();
  });
});
