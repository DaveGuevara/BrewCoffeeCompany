import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

// models
import { Earn } from '../../../models/earn.model';

@Component({
  templateUrl: 'earn.html'
})

export class EarnPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData) {


    }

  ionViewWillEnter() {
    
  }

}
