import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { CreateItemComponent } from './pages/create-item/create-item.component';
import { FilterComponent } from './components/filter/filter.component';
import { SharedModule } from '../shared/shared.module';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [SearchResultsComponent, CreateItemComponent, FilterComponent],
  imports: [CommonModule, SharedModule, YoutubeRoutingModule],
})
export class YoutubeModule {}
