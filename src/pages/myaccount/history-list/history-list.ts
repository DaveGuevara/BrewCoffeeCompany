import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-history-list',
  templateUrl: 'history-list.html'
})
export class HistoryListPage {

    constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {}

    ionViewDidLoad() {
      this.userData.LoadingControllerDismiss();
    }

  }
