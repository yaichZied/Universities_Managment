import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the PointingAgentHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pointing-agent-home',
  templateUrl: 'pointing-agent-home.html',
})
export class PointingAgentHomePage {
	timeStarts=0;
  list;
  myDate;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public auth : AuthProvider,
              public api : ApiProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter() {
    this.refresh();
  }

  refresh(){
     let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let date = 0;
    if(this.timeStarts){
      date=this.timeStarts;
    }
    console.log('/course/pointing?date='+date)
    this.api.get('/course/pointing?date='+date).then(data=>{
      console.log(data)
      this.list=data;
      loading.dismiss();
    })
  }
  point(id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.add('pointing',{course : {id : id }}).then(data=>{
      let toast = this.toastCtrl.create({
        message: 'Marked Absent',
        duration: 2000,
        closeButtonText: 'Got it!',
        dismissOnPageChange: true,
        showCloseButton: true,
        position: 'bottom'
      });
      loading.dismiss();

      toast.present(toast);
      this.refresh()
    })
  }

  changeDate() {
    this.timeStarts=new Date(this.myDate.substring(0,this.myDate.length -1)).getTime();
    this.refresh()
  }

}
