import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { EditCreateHeroeComponent } from './pages/edit-create-heroe/edit-create-heroe.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoadInterceptorService } from './interceptor/load-interceptor.service';

@NgModule({
  declarations: [AppComponent, HomePageComponent, EditCreateHeroeComponent, DialogComponent, UpperCaseDirective],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    AppRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: LoadInterceptorService, multi: true } ],
  bootstrap: [AppComponent],
})
export class AppModule {}
