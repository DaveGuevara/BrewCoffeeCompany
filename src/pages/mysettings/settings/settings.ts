import { Component } from '@angular/core';

import { Platform, NavController, ModalController } from 'ionic-angular';
import { AppVersion } from 'ionic-native';

// app pages
import { AboutPage } from '../../../pages/about/about';
//import { PersonalProfilePage } from '../../myinfo/personalprofile/personalprofile';
import { ProfileDetailsPage } from '../../myinfo/profiledetails/profiledetails';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  appversion = '';
  imgsrc: string;

  constructor(
    public nav: NavController,
    public modalController: ModalController,
    public platform: Platform,
    public userData: UserData) {

    platform.ready().then(() => {
      AppVersion.getVersionNumber().then(ver => {
        this.appversion = ver;
      }).catch(function(error) {
        console.log(error);
      });
    });
  }

  openPersonalProfile() {
    this.nav.push(ProfileDetailsPage, {paramSettings: this.userData.user});
  }
  openAboutPage() {
    this.nav.push(AboutPage);
  }
  toggleTouchID(e) {
    this.userData.updateTouchID(e.checked);
  }
  houseMember() {
    //this.userData.copyAccounts();
  }
  reportBug() {

  }
  suggestFeature() {
  }

}
