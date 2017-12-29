import { MyApp } from './../app/app.component';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CrudsSelectComponent } from './cruds-select/cruds-select';
@NgModule({
	declarations: [
    CrudsSelectComponent],
	imports: [IonicPageModule.forChild(CrudsSelectComponent)],
	exports: [
    CrudsSelectComponent]
})
export class ComponentsModule {}
