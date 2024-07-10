import { Component } from '@angular/core';
import { SearchService } from '../../../youtube/services/search.service';
import { FilterService } from '../../../youtube/services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    protected searchService: SearchService,
    protected filterService: FilterService
  ) {}
}
