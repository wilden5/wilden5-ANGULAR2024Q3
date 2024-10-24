import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { CreateItemComponent } from './pages/create-item/create-item.component';
import { FilterComponent } from './components/filter/filter.component';
import { SharedModule } from '../shared/shared.module';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { ItemDetailedInformationComponent } from './pages/item-detailed-information/item-detailed-information.component';

@NgModule({
  declarations: [SearchResultsComponent, CreateItemComponent, FilterComponent, ItemDetailedInformationComponent],
  imports: [CommonModule, SharedModule, YoutubeRoutingModule],
})
export class YoutubeModule {}
