import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { ColoredBorderDirective } from './directives/colored-border.directive';
import { FilterByKeywordPipe } from './pipes/filter-by-keyword.pipe';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';

@NgModule({
  declarations: [SearchItemComponent, ColoredBorderDirective, FilterByKeywordPipe],
  imports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CustomButtonComponent,
    RouterLink,
  ],
  exports: [
    SearchItemComponent,
    ColoredBorderDirective,
    FilterByKeywordPipe,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CustomButtonComponent,
  ],
  providers: [FilterByKeywordPipe],
})
export class SharedModule {}
