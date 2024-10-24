import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { authGuard } from '../core/guards/auth.guard';
import { ItemDetailedInformationComponent } from './pages/item-detailed-information/item-detailed-information.component';
import { CreateItemComponent } from './pages/create-item/create-item.component';

const routes: Routes = [
  {
    path: '',
    component: SearchResultsComponent,
    canActivate: [authGuard],
  },
  { path: 'item/:id', component: ItemDetailedInformationComponent, canActivate: [authGuard] },
  { path: 'create-item', component: CreateItemComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
