import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LokkenismsPage } from './lokkenisms';
import { AddLokkenismPage } from '../add-lokkenism/add-lokkenism';

@NgModule({
  declarations: [
    LokkenismsPage
  ],
  imports: [
    IonicPageModule.forChild(LokkenismsPage)
  ]
})
export class LokkenismsPageModule {}
