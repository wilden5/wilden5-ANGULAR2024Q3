import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SearchService } from './search.service';
import { SearchItem } from '../models/search-item';
import { itemsReducer } from '../../redux/reducers/items.reducer';

describe('search service', () => {
  let searchService: SearchService;
  let httpMock: HttpTestingController;

  const mockISearchItemResponse: Partial<SearchItem>[] = [
    {
      id: 'id1',
    },
    {
      id: 'id2',
    },
    {
      id: 'id3',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          appState: itemsReducer,
        }),
      ],
      providers: [SearchService],
    });
    searchService = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(searchService).toBeTruthy();
  });

  it('should get youtube items by ids', () => {
    const ids = mockISearchItemResponse.map((item) => item.id).join(',');
    searchService.getYoutubeItemsByIds(ids).subscribe((response) => {
      expect(response).toEqual(mockISearchItemResponse);
    });
    const req = httpMock.expectOne(`videos?part=snippet,statistics&id=${ids}`);
    req.flush(mockISearchItemResponse);
  });

  it('should get specific item by id', () => {
    const expectedItem: Partial<SearchItem> = { id: 'id1' };
    searchService.getSpecificYoutubeItemById('id1').subscribe((response) => {
      expect(response).toEqual(expectedItem);
    });
    const req = httpMock.expectOne(`videos?part=snippet,statistics&id=id1`);
    req.flush(mockISearchItemResponse);
  });
});
