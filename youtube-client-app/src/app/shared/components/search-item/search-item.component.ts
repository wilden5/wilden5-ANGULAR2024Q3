import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchItem } from '../../../youtube/models/search-item';
import { DELETE_CUSTOM_ITEM } from '../../../redux/actions/custom-items.actions';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() searchItem?: SearchItem;

  constructor(private store: Store) {}

  onDeleteCustomItem(searchItem: SearchItem): void {
    const id = searchItem.id as string;
    this.store.dispatch(DELETE_CUSTOM_ITEM({ id }));
  }
}
