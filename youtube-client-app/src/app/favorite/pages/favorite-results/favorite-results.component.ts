import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavoriteItems } from '../../../redux/selectors/youtube-items.selector';

@Component({
  selector: 'app-favorite-results',
  templateUrl: './favorite-results.component.html',
  styleUrl: './favorite-results.component.scss',
})
export class FavoriteResultsComponent {
  protected readonly selectFavoriteItems = selectFavoriteItems;

  constructor(protected store: Store) {}
}
