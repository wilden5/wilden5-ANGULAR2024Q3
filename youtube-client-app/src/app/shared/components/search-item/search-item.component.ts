import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';
import { SearchItem } from '../../../youtube/models/search-item';
import { DELETE_CUSTOM_ITEM } from '../../../redux/actions/custom-items.actions';
import {
  ADD_ITEM_TO_FAVORITE_LIST,
  REMOVE_ITEM_FROM_FAVORITE_LIST,
} from '../../../redux/actions/youtube-items.actions';
import { selectFavoriteListIds, selectSpecificFavoriteItem } from '../../../redux/selectors/youtube-items.selector';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() searchItem!: SearchItem;

  favoriteListIds$: Observable<string[]>;

  constructor(private store: Store) {
    this.favoriteListIds$ = this.store.select(selectFavoriteListIds);
  }

  onDeleteCustomItem(searchItem: SearchItem): void {
    const id = searchItem.id as string;
    this.store.dispatch(DELETE_CUSTOM_ITEM({ id }));
  }

  onFavoriteClick(searchItem: SearchItem): void {
    const id = searchItem.id as string;
    this.store
      .select(selectSpecificFavoriteItem(id))
      .pipe(first())
      .subscribe((isFavorite) => {
        if (isFavorite) {
          this.store.dispatch(REMOVE_ITEM_FROM_FAVORITE_LIST({ id }));
        } else {
          this.store.dispatch(ADD_ITEM_TO_FAVORITE_LIST({ id }));
        }
      });
  }

  updateIcon(searchItem: SearchItem): Observable<boolean> {
    const id = searchItem.id as string;
    return this.favoriteListIds$.pipe(map((favoriteListIds) => favoriteListIds.includes(id)));
  }
}
