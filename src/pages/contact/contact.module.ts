import { ComponentsModule } from './../../components/components.module';
import { CrudsEditPageModule } from './../cruds-edit/cruds-edit.module';
import { CrudsEditPage } from './../cruds-edit/cruds-edit';
import { CrudsSelectComponent } from './../../components/cruds-select/cruds-select';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),ComponentsModule
    
  ],
})
export class ContactPageModule {}
