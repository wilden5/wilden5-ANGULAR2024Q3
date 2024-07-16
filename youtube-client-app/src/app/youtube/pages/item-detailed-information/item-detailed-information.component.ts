import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchItem } from '../../models/search-item';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-item-detailed-information',
  templateUrl: './item-detailed-information.component.html',
  styleUrl: './item-detailed-information.component.scss',
})
export class ItemDetailedInformationComponent implements OnInit {
  @Input() searchItem?: Observable<SearchItem>;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected searchService: SearchService
  ) {}

  ngOnInit(): void {
    const itemId = this.activatedRoute.snapshot.params['id'];
    this.searchItem = this.searchService.selectItemById(itemId);
  }
}
