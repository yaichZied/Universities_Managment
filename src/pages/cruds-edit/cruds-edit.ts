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
        }else{
          if(this.entity&&this.entity[element.name])
          {
            if(element.manyToOne)
            {
              this.setItem(element.name);
            }
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
    if(this.items)
    {
      this.items.forEach(element => {
        element.refresh();
      });
    }
  }
  selectChange(event) {
    console.log(event)
    this.entity[event.name]=event.value
  }
public setItem(name) {
  var __this = this;
  if(this.items&&this.items.length)
  {
    this.items.forEach(function(item) {
      if(item.name&&item.name==name){
        item.setSelected(__this.entity[name]);
      }
    });
  }
  
  else
  {

    console.log('setting later ' + name);
    setTimeout(()=>{
      this.setItem(name);
    },100)
  }
}
  eval( value ){
    let entity = this.entity;
    return eval(value);
  }
  save()
  {
    if(this.items&&this.items.length)
    {
      var __this=this;
      this.items.forEach(function(item) {
        if(item.name){
          __this.entity[item.name]=item.selected.id?{id : item.selected.id}:null
        }
      });
    }
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
