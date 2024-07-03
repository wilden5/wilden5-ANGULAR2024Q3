import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showFilterMenu: boolean = false;

  filterMenuClick(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }
}
