import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  showFilterMenu: boolean = false;

  toggleFilterPanel(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }
}
