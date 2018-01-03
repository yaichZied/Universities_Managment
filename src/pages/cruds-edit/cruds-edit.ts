import { CrudsSelectComponent } from './../../components/cruds-select/cruds-select';
import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicModule } from 'ionic-angular';

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
            if(element.type=='boolean')
            {
              this.entity[element.name]=true;
            }
            else
            {
              this.entity[element.name]="";
            }
            //this.entity[element.name]="";
          }
        }
      });
      this.openAll();
    });
  }
  ionViewDidEnter()
  {
    this.refreshAll();
  }
  @ViewChildren(CrudsSelectComponent) items;
  public openAll() {
    if(this.items&&this.items.first)
    {
      this.items.first.openAll()
    }
    else
    {
      setTimeout(()=>{
        this.openAll();
      },100)
    }
  }
  public refreshAll() {
    console.log("refreshing")
    if(this.items)
    {
      console.log("refreshing enter")
      this.items.forEach(element => {
        console.log("refreshing item")
        element.refresh();
      });
    }
  }
  eval( value ){
    let entity = this.entity;
    return eval(value);
  }
  save()
  {
    if(this.edit)
    {
      this.api.put('/'+this.name+'/'+this.entity.id,this.entity).subscribe(data => {
        this.navCtrl.pop();
      });
    }
    else
    {
      this.api.put('/'+this.name+'/',this.entity).subscribe(data => {
        this.navCtrl.pop();
      });
    }
  }
  
  private name;
  private schema;
  private entity;
  private edit;

}
