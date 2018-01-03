import { ApiProvider } from './../../providers/api/api';
import { NavController, NavParams, IonicModule, ItemSliding, Item } from 'ionic-angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

/**
 * Generated class for the CrudsSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cruds-select',
  templateUrl: 'cruds-select.html'
})
export class CrudsSelectComponent implements OnInit{
  
  ngOnInit(): void {
    this.refresh();
  }
  refresh(): void {
    const __this=this
    this.api.get('/'+this.name+'/').subscribe(data => {
      this.list=data;
      if(this.selected&&this.selected.id)
      {
        this.list.forEach(element => {
          if(element.id==this.selected.id)
          {
            this.selected=element;
          }
        });
      }
      this.api.get('/'+this.name+'/structure').subscribe(data => {
        if(data&&data.subClasses&&data.subClasses.length)
        {
          this.subClasses=data.subClasses;
          if(!data.abstract)
          {
            this.subClasses.push(this.name);
          }
        }
        else
        {
          this.subClasses=false;
        }
        
      });
    });
    this.close(this.slidingItem,this.item);
  }

  @Input() private name;
  @Input() private selected;
  private list;
  private subClasses;
  private selectedSubClasse;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api : ApiProvider) {
   
  }
  go()
  {
    if(this.subClasses&&this.subClasses.length)
    {
      if(this.selectedSubClasse)
      {
        this.navCtrl.push('CrudsEditPage', {
          name: this.selectedSubClasse
        });
      }
    }
    else
    {
      this.navCtrl.push('CrudsEditPage', {
        name: this.name
      });
    }
    
  }

  public open(itemSlide: ItemSliding, ite: Item) {
    itemSlide.setElementClass("active-sliding", true);
    itemSlide.setElementClass("active-slide", true);
    itemSlide.setElementClass("active-options-right", true);
    ite.setElementStyle("transform", "translate3d(-90px, 0px, 0px)");  
  }
  public close(item: ItemSliding, ite: Item) {
    
    ite.setElementStyle("transform", "translate3d(-90px, 0px, 0px) reverse"); 
    setTimeout(()=>{
      item.setElementClass("active-slide", false);
      item.setElementClass("active-slide", false);
      item.setElementClass("active-options-right", false);
      item.close();
    },500);
  }
  @ViewChild(ItemSliding) slidingItem;
  @ViewChild(Item) item;
  public openAll() {
    if(this.item&&this.slidingItem)
    {
      this.open(this.slidingItem,this.item);
      setTimeout(()=>{
        this.close(this.slidingItem,this.item);
      },1000)
    }
    else
    {
      setTimeout(()=>{
        this.openAll();
      },100)
    }
  }

}
