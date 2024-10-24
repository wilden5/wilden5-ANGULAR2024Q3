import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { SearchItem } from '../models/search-item';
import {
  selectYoutubeItemsSortedByDateAsc,
  selectYoutubeItemsSortedByDateDesc,
  selectYoutubeItemsSortedByViewCountAsc,
  selectYoutubeItemsSortedByViewCountDesc,
} from '../../redux/selectors/youtube-items.selector';
import { SORT_YOUTUBE_ITEMS } from '../../redux/actions/youtube-items.actions';
import { selectAllItems } from '../../redux/selectors/items.selector';
import { FilterByKeywordPipe } from '../../shared/pipes/filter-by-keyword.pipe';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  isFilterMenu: boolean = false;

  isFilterByDateAscending = false;

  isFilterByViewsAscending = false;

  filteredItems?: Observable<SearchItem[]>;

  constructor(
    private store: Store,
    private filterByKeywordPipe: FilterByKeywordPipe
  ) {}

  toggleFilterPanel(): void {
    this.isFilterMenu = !this.isFilterMenu;
  }

  performFilterByDate(): void {
    this.isFilterByDateAscending = !this.isFilterByDateAscending;
    if (this.isFilterByDateAscending) {
      this.filteredItems = this.store.select(selectYoutubeItemsSortedByDateAsc);
    } else {
      this.filteredItems = this.store.select(selectYoutubeItemsSortedByDateDesc);
    }

    this.filteredItems.pipe(first()).subscribe((filteredStore) => {
      this.store.dispatch(SORT_YOUTUBE_ITEMS({ youtubeItems: filteredStore }));
    });
  }

  performFilterByViews(): void {
    this.isFilterByViewsAscending = !this.isFilterByViewsAscending;
    if (this.isFilterByViewsAscending) {
      this.filteredItems = this.store.select(selectYoutubeItemsSortedByViewCountAsc);
    } else {
      this.filteredItems = this.store.select(selectYoutubeItemsSortedByViewCountDesc);
    }

    this.filteredItems.pipe(first()).subscribe((filteredStore) => {
      this.store.dispatch(SORT_YOUTUBE_ITEMS({ youtubeItems: filteredStore }));
    });
  }

  performFilterByKeyword(searchQuery: string): Observable<SearchItem[]> {
    return (this.filteredItems = this.filterByKeywordPipe.transform(this.store.select(selectAllItems), searchQuery));
  }
}
