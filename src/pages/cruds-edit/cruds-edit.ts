import { CrudsSelectComponent } from './../../components/cruds-select/cruds-select';
import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NavigationProvider} from "../../providers/navigation/navigation";

@IonicPage()
@Component({
  selector: 'page-cruds-edit',
  templateUrl: 'cruds-edit.html',
})
export class CrudsEditPage {
  private name;
  private schema;
  private entity;
  private edit;

  @ViewChildren(CrudsSelectComponent) items;
  constructor(public navigation: NavigationProvider,
              public navParams: NavParams,
              public api : ApiProvider,
              public navCtrl:NavController) {
    this.name=navParams.get("name");
    this.entity=navParams.get("entity");
    if(this.entity&&this.entity.id)
    {
      this.edit = true;
      if(this.entity.className)
      {
        this.name=this.entity.className;
      }
      this.refresh();
    }
    else{
      this.edit=false;
      this.api.default(this.name)
        .then(data => {
          this.entity = data;
          this.refresh();
        });
    }

  }
  refresh(){
    this.api.structure(this.name)
      .then(data => {
        this.schema=data;
        this.schema.fields.forEach(element => {
          if(element.manyToOne)
          {
            this.setItem(element.name);
          }
          if(element.type=='date')
          {
            let d =new Date(this.entity[element.name])
            console.log(this.entity[element.name])
            if(d.getDate()){
              this.entity[element.name]=d.getFullYear()
                +'-'+this.n(d.getMonth()+1)
                +'-'+this.n(d.getDate());
            }
          }
        });
        this.openAll();
      });
  }

  n(n){
    return n > 9 ? "" + n: "0" + n;
  }

  ionViewDidEnter()
  {
    this.refresh();
    this.refreshSelects();
  }
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
  public refreshSelects() {
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
      this.api.update(this.name,this.entity.id,this.entity).then(data => {
        this.navCtrl.pop();
      }).catch(error =>{
        this.handleError(error);
      });
    }
    else
    {
      this.api.add(this.name,this.entity).then(data => {
        this.navCtrl.pop();
      }).catch(error =>{
        this.handleError(error);
      });
    }
  }

  handleError(error){
    console.log(error);
  }


}
