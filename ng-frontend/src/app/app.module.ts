import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { Routes, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http'

import { SearchService } from './search.service';
import { ModalService } from './modal.service'
import { HamburgerMenuService } from './hamburger-menu.service'

import { SearchBookComponent } from './search-book/search-book.component';
import { BookModalComponent } from './book-modal/book-modal.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'search', component: SearchPageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    SearchPageComponent,
    SearchBookComponent,
    BookModalComponent,
    HamburgerMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SearchService,
    ModalService,
    HamburgerMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
