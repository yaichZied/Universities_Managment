import { ComponentsModule } from './../../components/components.module';
import { CrudsSelectComponent } from './../../components/cruds-select/cruds-select';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrudsEditPage } from './cruds-edit';

@NgModule({
  declarations: [
    CrudsEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CrudsEditPage),ComponentsModule
  ],
})
export class CrudsEditPageModule {}
