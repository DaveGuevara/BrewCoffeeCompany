import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//  services
import { UserData } from '../../../providers/user-data';

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

}
