import { ApiProvider } from './../../providers/api/api';
import { NavController, NavParams, IonicModule } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';

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
      
    });
  }

  @Input() private name;
  @Input() private selected;
  private list;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public api : ApiProvider) {
   
  }
  go()
  {
    this.navCtrl.push('CrudsEditPage', {
      name: this.name
  });
  }

}
