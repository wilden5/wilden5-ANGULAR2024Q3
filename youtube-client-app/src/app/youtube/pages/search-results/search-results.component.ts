import { Component, DestroyRef, OnInit } from '@angular/core';
import { debounceTime, filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchService } from '../../services/search.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  constructor(
    protected searchService: SearchService,
    protected filterService: FilterService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.searchService.searchQuery
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((value) => value.length > 2),
        debounceTime(1000),
        switchMap((value) => this.searchService.performSearchByValue(value))
      )
      .subscribe();
  }
}
