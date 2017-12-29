import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BlockProvider } from '../../providers/block/block';
/**
 * Generated class for the BlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-block',
  templateUrl: 'block.html',
})
export class BlockPage {
blocks;
  constructor(public navCtrl: NavController, public navParams: NavParams, private blockProvider: BlockProvider) {
    this.blockProvider.gettBlock().subscribe(data => {
      console.log(data); 
      this.blocks=data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockPage');
  }

  onShowBlockDetail(block){
    this.navCtrl.push('BlockDetailsPage', {block: block});
  }
}
