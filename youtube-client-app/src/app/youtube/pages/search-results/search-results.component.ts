import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  constructor(
    protected searchService: SearchService,
    protected filterService: FilterService
  ) {}
}
