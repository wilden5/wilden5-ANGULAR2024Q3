import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FavoriteResultsComponent } from './pages/favorite-results/favorite-results.component';

const routes: Routes = [{ path: '', component: FavoriteResultsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteRoutingModule {}
