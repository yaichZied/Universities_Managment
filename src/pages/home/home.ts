import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NavigationProvider} from "../../providers/navigation/navigation";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  eventSource;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private navigation: NavigationProvider) {
    navigation.root(this.navCtrl);
  }

  ionViewDidLoad() {
    
  }

}
