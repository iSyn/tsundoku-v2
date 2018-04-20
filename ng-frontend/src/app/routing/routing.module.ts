import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SearchPageComponent } from '../search-page/search-page.component'

const routes: Routes = [
  {
    path: 'search',
    component: SearchPageComponent
  }
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { AboutComponent } from './about/about.component';
// import { LinksComponent } from './links/links.component';
// import { ResumeComponent } from './resume/resume.component';

// const routes: Routes = [
//     {
//         path: 'resume/:id',
//         component: ResumeComponent
//     },
//     {
//         path: 'links',
//         component: LinksComponent
//     }
// ];

// @NgModule({
//     imports: [ RouterModule.forRoot(routes) ],
//     exports: [ RouterModule ]
// })
// export class AppRoutingModule {}