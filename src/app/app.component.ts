import { AuthProvider } from './../providers/auth/auth';
import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private authProvider: AuthProvider) {
    platform.ready().then(() => {
      this.authProvider.me().toPromise().then(user=>{
        this.rootPage="TabsPage";
        statusBar.styleDefault();
        splashScreen.hide();
      }).catch(error=>{
        this.rootPage="LoginPage";
        statusBar.styleDefault();
        splashScreen.hide();
  
      })
    });
  }
}
