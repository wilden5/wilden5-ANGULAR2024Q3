import { Component } from '@angular/core';
import { mockSearchResponse } from '../../shared/mock';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  mockSearchResponse = mockSearchResponse;
}
