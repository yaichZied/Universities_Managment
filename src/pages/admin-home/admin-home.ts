import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {NavigationProvider} from "../../providers/navigation/navigation";

/**
 * Generated class for the AdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {
  names=["course","pointing","subject","block","floor","classRoom","department","level","subLevel","group","user","timeSlot","semester"]
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth:AuthProvider,
              public navigation : NavigationProvider) {
  }

  ionViewDidLoad() {

  }

}
