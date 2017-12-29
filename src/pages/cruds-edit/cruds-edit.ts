import { CrudsSelectComponent } from './../../components/cruds-select/cruds-select';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicModule } from 'ionic-angular';
/**
 * Generated class for the CrudsEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruds-edit',
  templateUrl: 'cruds-edit.html',
})
export class CrudsEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public api : ApiProvider) {
    this.name=navParams.get("name");
    this.entity=navParams.get("entity");
    if(this.entity&&this.entity.id)
    {
      this.edit = true;
    }
    else{
      this.entity={};
      this.edit=false;
    }
    
  }

  ionViewDidLoad() {
    this.api.get('/'+this.name+'/structure').subscribe(data => {
      this.schema=data;
      
      this.schema.fields.forEach(element => {
        if(!this.entity||!this.entity[element.name])
        {
          if(element.manyToOne)
          {
            this.entity[element.name]=null;
          }
          else
          {
            this.entity[element.name]="";
          }
        }
      });
    });
  }

  private name;
  private schema;
  private entity;
  private edit;

}
