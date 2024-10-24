import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteResultsComponent } from './pages/favorite-results/favorite-results.component';
import { SharedModule } from '../shared/shared.module';
import { FavoriteRoutingModule } from './favorite-routing.module';

@NgModule({
  declarations: [FavoriteResultsComponent],
  imports: [CommonModule, SharedModule, FavoriteRoutingModule],
})
export class FavoriteModule {}
