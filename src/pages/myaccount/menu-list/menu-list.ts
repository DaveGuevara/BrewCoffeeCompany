import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html'
})

app.controller('MyCtrl', function($scope) {
 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true
});

export class MenuListPage {

    constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {}

    ionViewDidLoad() {
      this.userData.LoadingControllerDismiss();
    }

  }
