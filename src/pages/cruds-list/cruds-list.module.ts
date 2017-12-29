import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrudsListPage } from './cruds-list';

@NgModule({
  declarations: [
    CrudsListPage,
  ],
  imports: [
    IonicPageModule.forChild(CrudsListPage),
  ],
})
export class CrudsListPageModule {}
