import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { YoutubeModule } from '../youtube/youtube.module';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, MainComponent],
  imports: [CommonModule, SharedModule, RouterLink, YoutubeModule],
  exports: [HeaderComponent, MainComponent],
})
export class CoreModule {}
