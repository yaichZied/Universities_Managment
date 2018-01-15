import {ApiProvider} from './../../providers/api/api';
import {Component, ViewChild} from '@angular/core';
import {
  IonicPage,
  Item,
  ItemSliding,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {NavigationProvider} from "../../providers/navigation/navigation";
import {AuthProvider} from "../../providers/auth/auth";

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
  public name;
  public list;
  @ViewChild(ItemSliding) slidingItem;
  @ViewChild(Item) item;
  constructor(public loadingCtrl: LoadingController,
              public navParams: NavParams,
              public api : ApiProvider,
              public toastCtrl: ToastController,
              public navigation:NavigationProvider,
              public navCtrl:NavController,
              public auth:AuthProvider) {
    this.name=navParams.get("name");
  }


  ionViewDidEnter() {
    this.refresh();
  }
  refresh()
  {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present().then();
    console.log(this.name)
    this.api.list(this.name)
      .then(data => {
        loading.dismiss().then();
        this.list=data;
        this.openAll();
      }).catch(error=>{
        this.handleError(error);
      });
  }


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

  deleteS(id)
  {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present().then();
    this.api.remove(this.name,id)
      .then(data => {
        let toast = this.toastCtrl.create({
          message: 'Item Deleted',
          duration: 2000,
          closeButtonText: 'Got it!',
          dismissOnPageChange: true,
          showCloseButton: true,
          position: 'bottom'
        });
        loading.dismiss().then();
        toast.present(toast).then();
        this.refresh();
      })
      .catch(error =>{
        this.handleError(error);
      })
  }
  addS()
  {
    this.navigation.add(this.name,this.navCtrl);
  }

  editS(id)
  {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present().then();
    this.api.getEntity(this.name,id).then(data => {
      loading.dismiss().then();
      console.log(data)
      this.navigation.edit(data,this.navCtrl);
    }).catch(error=>{
      this.handleError(error);
    });

  }
  detailsS(id)
  {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present().then();
    this.api.getEntity(name,id).then(data => {
      loading.dismiss().then();
      this.navigation.show(data,this.navCtrl);
    }).catch(error=>{
      this.handleError(error);
    });
  }
  handleError(error){
    console.log(error);
  }
}
