import { Component } from '@angular/core';

import { NavController, ActionSheetController } from 'ionic-angular';

// app pages

// services
import { UserData } from '../../../providers/user-data';

import { ChangeNamePage } from '../../myinfo/changename/changename';
import { ChangePasswordPage } from '../../myinfo/changepassword/changepassword';


// firebase
declare var firebase: any;

@Component({
  selector: 'page-profiledetails',
  templateUrl: 'profiledetails.html'
})

export class ProfileDetailsPage {

  fullname: string;
  nickname: string;

  hasDataProfileFullName: boolean = false;
  hasDataProfileNickname: boolean = false;

  constructor(
    public nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public userData: UserData) {

    if (this.userData.user.fullname != '') {
      this.hasDataProfileFullName = true;
      this.fullname = this.userData.user.fullname;
    }

    if (this.userData.user.nickname != '') {
      this.hasDataProfileNickname = true;
      this.nickname = this.userData.user.nickname;
    }

  }

  changeName() {
    this.nav.push(ChangeNamePage);
  }

  changePassword() {
    this.nav.push(ChangePasswordPage);
  }

}
