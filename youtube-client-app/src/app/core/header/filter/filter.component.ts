import { Component } from '@angular/core';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  constructor(protected searchService: SearchService) {}
}
