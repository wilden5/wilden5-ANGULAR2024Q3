import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { SearchItemComponent } from './search/search-item/search-item.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { CreateItemComponent } from './admin/create-item/create-item.component';
import { MainComponent } from './core/main/main.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { FilterComponent } from './core/header/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    SearchItemComponent,
    LoginComponent,
    RegistrationComponent,
    CreateItemComponent,
    MainComponent,
    PageNotFoundComponent,
    FilterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
