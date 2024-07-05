import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
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
import { CustomButtonComponent } from './shared/components/custom-button/custom-button.component';
import { FilterByKeywordPipe } from './shared/pipes/filter-by-keyword.pipe';

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
    FilterByKeywordPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    CustomButtonComponent,
    MatIconModule,
    MatCardModule,
  ],
  providers: [FilterByKeywordPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
