import {Injectable} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from "ionic-angular";
import {AuthProvider} from "../auth/auth";
import {ApiProvider} from "../api/api";

/*
  Generated class for the NavigationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NavigationProvider {

  constructor(public api: ApiProvider,
              private authProvider: AuthProvider,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

  }
  public root(navCtrl: NavController){
    this.authProvider.me().then(user=>{
      console.log(user.authorities)
      if(user.authorities.indexOf("ROLE_ADMIN")>=0){
        console.log("AdminHomePage")
        navCtrl.setRoot("AdminHomePage").then();;
        return;
      }
      if(user.authorities.indexOf("ROLE_TEACHER")>=0){
        console.log("TeacherHomePage")
        navCtrl.setRoot('CrudsListPage',{
		  name : "course"
		}).then();
        return;
      }
      if(user.authorities.indexOf("ROLE_STUDENT")>=0){
        console.log("AdminHomePage")
        navCtrl.setRoot('CrudsListPage',{
		  name : "course"
		}).then();
        return;
      }
      if(user.authorities.indexOf("ROLE_POINTING")>=0){
        console.log("PointingAgentHomePage")
        navCtrl.setRoot("PointingAgentHomePage").then();;
        return;
      }
      console.log("Nothing")
    }).catch(error=>{
      navCtrl.setRoot("LoginPage");
    })
  }
  public edit(entity,navCtrl: NavController){
    if(entity.canEdit){
      this.goToEdit(entity,navCtrl);
    }
    let toast = this.toastCtrl.create({
      message: 'Not authorized',
      duration: 2000,
      closeButtonText: 'Got it!',
      dismissOnPageChange: true,
      showCloseButton: true,
      position: 'bottom'
    });
    toast.present(toast);
  }
  public show(entity,navCtrl: NavController){
    this.goToShow(entity,navCtrl);
  }
  public add(name,navCtrl: NavController,comingFrom=false){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.api.get('/'+name+'/structure').then(data => {
      loading.dismiss();
      if(!data.abstract&&((comingFrom&&comingFrom==name)||!data.subClasses||!data.subClasses.length))
      {
        this.goToAdd(name,navCtrl);
      }
      else
      {
        this.selectSub(name,data,navCtrl);
      }
    }).catch(error=>{
      this.handleError(error);
    });
  }
  public list(name,navCtrl: NavController){

    this.goToList(name,navCtrl);
  }
  private selectSub(name,structure,navCtrl: NavController) {
    let inputs = [];
    structure.subClasses.forEach(subClass =>{
      if(subClass.canAdd){
        inputs.push({
          label: subClass.name,
          value: subClass.name,
          name: 'subClass',
          type: 'radio'
        });
      }
    });
    if(!structure.abstract){
      inputs.push({
        label: name,
        value: name,
        name: 'subClass',
        type: 'radio'
      });
    }
    let alert = this.alertCtrl.create({
      title: 'Select Type',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          role: 'cancel',
          handler: data => {
            this.add(data,navCtrl,name);
          }
        }
      ]
    });
    alert.present();
  }
  private goToAdd(name,navCtrl: NavController){
    navCtrl.push('CrudsEditPage',{
      name : name
    });
  }
  private goToEdit(entity,navCtrl: NavController){
    navCtrl.push('CrudsEditPage',{
      entity : entity
    });
  }
  private goToShow(entity,navCtrl: NavController){
    navCtrl.push('CrudsEditPage',{
      entity : entity
    });
  }

  private goToList(name,navCtrl: NavController){

    navCtrl.push('CrudsListPage',{
      name : name
    });
  }
  private handleError(error){
    console.log(error);
  }
}
