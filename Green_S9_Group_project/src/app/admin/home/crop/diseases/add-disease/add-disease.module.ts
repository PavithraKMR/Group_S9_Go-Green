import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
=======
import { FormsModule } from '@angular/forms';
>>>>>>> main

import { IonicModule } from '@ionic/angular';

import { AddDiseasePageRoutingModule } from './add-disease-routing.module';

import { AddDiseasePage } from './add-disease.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    AddDiseasePageRoutingModule,
    ReactiveFormsModule
=======
    AddDiseasePageRoutingModule
>>>>>>> main
  ],
  declarations: [AddDiseasePage]
})
export class AddDiseasePageModule {}
