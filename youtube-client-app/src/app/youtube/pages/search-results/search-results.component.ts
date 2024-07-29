import { Component, DestroyRef, OnInit } from '@angular/core';
import { debounceTime, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { SearchService } from '../../services/search.service';
import { FilterService } from '../../services/filter.service';
import {
  LOAD_NEXT_YOUTUBE_PAGE,
  LOAD_PREV_YOUTUBE_PAGE,
  SEARCH_YOUTUBE_ITEMS_BY_QUERY,
} from '../../../redux/actions/youtube-items.actions';
import { selectAllItems } from '../../../redux/selectors/items.selector';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  protected readonly selectAllItems = selectAllItems;

  constructor(
    protected searchService: SearchService,
    protected filterService: FilterService,
    private destroyRef: DestroyRef,
    protected store: Store
  ) {}

  ngOnInit(): void {
    this.searchService.searchQuery
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((value) => value.length > 2),
        debounceTime(1000)
      )
      .subscribe((searchQuery) => {
        this.store.dispatch(SEARCH_YOUTUBE_ITEMS_BY_QUERY({ searchQuery }));
      });
  }

  onPrevButton(): void {
    this.store.dispatch(LOAD_PREV_YOUTUBE_PAGE());
  }

  onNextButton(): void {
    this.store.dispatch(LOAD_NEXT_YOUTUBE_PAGE());
  }
}
