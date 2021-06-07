import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NoImagePipe } from './pipes/no-image.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    NoImagePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SpinnerComponent,
    NoImagePipe
  ]
})
export class SharedModule { }
