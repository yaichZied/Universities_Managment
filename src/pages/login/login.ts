import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username;
  password;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider , public toastCtrl: ToastController) {
  }
  ionViewDidLoad() {
    
  }
  
  onLogin(){
    console.log(this.username, this.password);
    let login = this.authProvider.login(this.username, this.password);
    login.toPromise().then(data=>{
      this.navCtrl.setRoot("TabsPage")
    }).catch(error=>{
      let toast = this.toastCtrl.create({
        message: 'Wrong Credentials',
        duration: 2000,
        closeButtonText: 'Got it!',
        dismissOnPageChange: true,
        showCloseButton: true,
        position: 'bottom'
      });
      toast.present(toast);        
      this.username="";
      this.password="";
    })
    /*this.authProvider.me().subscribe(data=>{
      console.log(data);
    })*/
  }
}
