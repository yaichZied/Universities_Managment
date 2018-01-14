import {ApiProvider} from './../../providers/api/api';
import {Item, ItemSliding, NavController, NavParams} from 'ionic-angular';
import {Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {NavigationProvider} from "../../providers/navigation/navigation";

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
    this.api.list(this.name).then(data => {
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
    });
    this.api.structure(this.name).then(data => {
      this.canAdd=data.canAdd;
    });
    this.close(this.slidingItem,this.item);
  }

  @Input() public name;
  @Input() public selected;
  private list;
  private canAdd=false;
  constructor(public navigation: NavigationProvider,
              public navCtrl:NavController,
              public zone: NgZone,
              public navParams: NavParams,
              public api : ApiProvider) {

  }
  public setSelected(selected){
    this.zone.run(()=>{
      this.selected=selected;
    })
  }
  compareFn(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.id === e2.id : false;
  }
  go()
  {
    this.navigation.add(this.name,this.navCtrl)
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
