import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CrudsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruds-list',
  templateUrl: 'cruds-list.html',
})
export class CrudsListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public api : ApiProvider,public toastCtrl: ToastController) {
    this.name=navParams.get("name");
  }

  ionViewDidLoad() {
    this.refresh();
  }
  refresh()
  {
    this.api.get('/'+this.name+'?fields=id').subscribe(data => {
      this.list=data;
    });
  }
  ionViewDidEnter() {
      this.refresh();
  }
  public name;
  public list;
  delete(id)
  {
    this.api.delete('/'+this.name+'/'+id).subscribe(data => {
      if(data&&data.success)
      {
        let toast = this.toastCtrl.create({
          message: 'Item Deleted',
          duration: 2000,
          closeButtonText: 'Got it!',
          dismissOnPageChange: true,
          showCloseButton: true,
          position: 'bottom'
        });
        toast.present(toast);  
      }
      else{
        let toast = this.toastCtrl.create({
          message: 'Can\'t delete this item',
          duration: 2000,
          closeButtonText: 'Got it!',
          dismissOnPageChange: true,
          showCloseButton: true,
          position: 'bottom'
        });
        toast.present(toast);  
      }
      this.refresh();
    });
  }
  add()
  {
    this.api.get('/'+this.name+'/structure').subscribe(data => {
      if(data.subClasses&&data.subClasses.length)
      {
        
      }
      else
      {
        this.navCtrl.push('CrudsEditPage', {
          name: this.name
        });
      }
      
    }); 
  }
  
  edit(id)
  {
    this.api.get('/'+this.name+'/'+id).subscribe(data => {
      this.navCtrl.push('CrudsEditPage',{
        name:this.name,
        entity : data
      });
    });
    
  }
  details(id)
  {
    this.api.get('/'+this.name+'/'+id).subscribe(data => {
      this.navCtrl.push('CrudsEditPage',{
        name:this.name,
        entity : data
      });
    });
  }
}
