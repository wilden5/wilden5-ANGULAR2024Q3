import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { ColoredBorderDirective } from './directives/colored-border.directive';
import { FilterByKeywordPipe } from './pipes/filter-by-keyword.pipe';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { DropShadowDirective } from './directives/drop-shadow.directive';

@NgModule({
  declarations: [SearchItemComponent, ColoredBorderDirective, FilterByKeywordPipe, DropShadowDirective],
  imports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CustomButtonComponent,
    RouterLink,
    HttpClientModule,
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
    DropShadowDirective,
    HttpClientModule,
  ],
  providers: [FilterByKeywordPipe],
})
export class SharedModule {}
