import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
//  Services
import { UserData } from '../../../providers/user-data';
// App page-dashboard
import { EarnPage } from  '../earn/earn';
// Models
import { Earn } from '../../../models/earn.model';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(
    public nav: NavController,
    public alertController: AlertController,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.userData.LoadingControllerDismiss();
  }


  Earn() {
    let tempEarn = new Earn(null,"1");
    this.nav.push(EarnPage, {paramAccount: tempEarn});
  }

}
