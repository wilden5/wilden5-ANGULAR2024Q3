import { Component } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showFilterMenu: boolean = false;

  constructor(private searchService: SearchService) {}

  filterMenuClick(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  searchButtonClick(inputValue: string): void {
    this.searchService.performSearchByValue(inputValue);
  }
}
