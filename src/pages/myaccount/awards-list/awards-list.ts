import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-awards-list',
  templateUrl: 'awards-list.html'
})
export class AwardsListPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.userData.LoadingControllerDismiss();
  }

}
