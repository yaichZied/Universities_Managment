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

}
