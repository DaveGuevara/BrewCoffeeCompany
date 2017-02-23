import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';
import { AccountData } from '../../../providers/account-data';

@Component({
  templateUrl: 'pickaccounttype.html'
})

export class PickAccountTypePage {
  
  pickType: string;
  item: {name?: string, icon?: string, $key?: string} = {};
  items: any;
  itemselected;
   
  constructor( 
    public nav: NavController,
    public userData: UserData,
    public accountData: AccountData) {}

  ionViewDidLoad() {
    this.loadAccountTypes();
    this.itemselected = {
      text: this.accountData.getAccountType()
    }
  }
  
  save(item) {
    this.accountData.setReferrer('PickAccountTypePage');
    this.accountData.setAccountType(item);
    this.goBack();
  }
  
  goBack() {
    this.nav.pop();
  }
  
  loadAccountTypes() {
    this.items = this.userData.getAccountTypes();
  }
}