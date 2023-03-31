import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EditCreateHeroeComponent } from './pages/edit-create-heroe/edit-create-heroe.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'new', component: EditCreateHeroeComponent},
  {path: ':id/edit', component: EditCreateHeroeComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
