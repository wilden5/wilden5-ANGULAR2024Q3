import { Component } from '@angular/core';
import { FilterService } from '../../../youtube/services/filter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(protected filterService: FilterService) {}
}
