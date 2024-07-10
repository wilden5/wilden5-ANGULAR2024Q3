import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, SharedModule, RouterLink],
  exports: [HeaderComponent],
})
export class CoreModule {}
