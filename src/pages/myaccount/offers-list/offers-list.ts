import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-offers-list',
  templateUrl: 'offers-list.html'
})
export class OffersListPage {

    constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {}

    ionViewDidLoad() {
      this.userData.LoadingControllerDismiss();
    }

  }
