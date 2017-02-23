import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-pickdefaultbalance',
  templateUrl: 'pickdefaultbalance.html'
})

export class PickDefaultBalancePage {  
  
  defaultItems;
  itemselected: string;
   
  constructor(
    public nav: NavController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.defaultItems = [
          { text: 'Current Balance', value: 'Current' },
          { text: 'Cleared Balance', value: 'Cleared' },
          { text: 'Today\'s Balance', value: 'Today' }
    ];
    this.itemselected = this.navParams.data.paramBalance;
  }
  
  pickPreference(itemselected) {
    this.viewCtrl.dismiss(itemselected);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}