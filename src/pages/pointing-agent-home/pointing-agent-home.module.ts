import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointingAgentHomePage } from './pointing-agent-home';

@NgModule({
  declarations: [
    PointingAgentHomePage,
  ],
  imports: [
    IonicPageModule.forChild(PointingAgentHomePage),
  ],
})
export class PointingAgentHomePageModule {}
