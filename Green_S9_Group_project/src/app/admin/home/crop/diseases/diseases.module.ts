import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
=======
import { FormsModule } from '@angular/forms';
>>>>>>> main

import { IonicModule } from '@ionic/angular';

import { DiseasesPageRoutingModule } from './diseases-routing.module';

import { DiseasesPage } from './diseases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    DiseasesPageRoutingModule,
    ReactiveFormsModule
=======
    DiseasesPageRoutingModule
>>>>>>> main
  ],
  declarations: [DiseasesPage]
})
export class DiseasesPageModule {}
