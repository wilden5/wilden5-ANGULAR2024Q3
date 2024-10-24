import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../youtube/services/search.service';
import { FilterService } from '../../../youtube/services/filter.service';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    protected searchService: SearchService,
    protected filterService: FilterService,
    protected loginService: LoginService,
    private router: Router
  ) {}

  onSearchInputChange(value: string): void {
    if (value.length > 2) {
      this.router.navigate(['/search']);
      this.searchService.searchQuery.next(value);
    }
  }
}
