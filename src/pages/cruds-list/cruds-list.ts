
import { ApiProvider } from './../../providers/api/api';
import { Component, ElementRef, Renderer, ViewChildren, QueryList, ViewChild, NgZone } from '@angular/core';
import { IonicPage ,NavController, NavParams, ToastController, LoadingController, ItemSliding, Item } from 'ionic-angular';

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
  shouldAnimate: boolean = true;
  constructor(public loadingCtrl: LoadingController ,private zone : NgZone,public renderer: Renderer,public element: ElementRef,public navCtrl: NavController, public navParams: NavParams,public api : ApiProvider,public toastCtrl: ToastController) {
    this.name=navParams.get("name");
}
  
  ionViewDidLoad() {
    this.refresh();
    
  }
  refresh()
  {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.api.get('/'+this.name+'?fields=id').subscribe(data => {
      loading.dismiss();
      this.list=data;
      this.openAll();
    });
  }
  
  ionViewDidEnter() {
    this.openAll();
      
  }
  public name;
  public list;
  public open(itemSlide: ItemSliding, ite: Item) {
    
      itemSlide.setElementClass("active-sliding", true);
      itemSlide.setElementClass("active-slide", true);
      itemSlide.setElementClass("active-options-right", true);
      ite.setElementStyle("transform", "translate3d(-214px, 0px, 0px)");  
  }
  public close(item: ItemSliding, ite: Item) {
    item.close();
    ite.setElementStyle("transform", "translate3d(-214px, 0px, 0px) reverse"); 
    setTimeout(()=>{
      
    item.setElementClass("active-slide", false);
    item.setElementClass("active-slide", false);
    item.setElementClass("active-options-right", false);
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
