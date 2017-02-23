import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, TouchID } from 'ionic-native';

// intro and login pages
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginAutoPage } from '../pages/loginauto/loginauto';
import { LogoutPage } from '../pages/logout/logout';

// app pages
import { AccountListPage } from '../pages/mymoney/account-list/account-list';
import { CategoryListPage } from '../pages/mymoney/category-list/category-list';
import { BudgetListPage } from '../pages/mymoney/budget-list/budget-list';
import { RecurringListPage } from '../pages/mymoney/recurring-list/recurring-list';
import { PayeeListPage } from '../pages/mymoney/payee-list/payee-list';
import { ReportListPage } from '../pages/mymoney/report-list/report-list';
import { SettingsPage } from '../pages/mysettings/settings/settings';

// services
import { UserData } from '../providers/user-data';

// firebase
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class BrewApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TutorialPage;

  pages: Array<{title: string, component: any, icon: string, color: string, showloader: boolean}>;
  logoutpages: Array<{title: string, component: any, icon: string, color: string}>;

  constructor(
    public platform: Platform,
    public userData: UserData) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Our Menu', component: AccountListPage, icon: 'ios-cafe-outline', color: '', showloader: false },
      { title: 'Events', component: BudgetListPage, icon: 'ios-calendar-outline', color: '', showloader: false  },
      { title: 'History', component: CategoryListPage, icon: 'ios-barcode-outline', color: '', showloader: true  },
      { title: 'Offers', component: PayeeListPage, icon: 'ios-card-outline', color: '', showloader: true  },
      { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline', color: '', showloader: false  },
    ];
    this.logoutpages = [
      { title: 'Logout', component: LogoutPage, icon: 'md-log-out', color: '#f53d3d', }
    ];

  }

  initializeApp() {

    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      StatusBar.styleLightContent();
      Splashscreen.hide();
      //
      // Check if TouchID has been selected
      this.userData.getStorageTouchID()
      .then((data) => {
        this.signInWithTouchID(this.userData.storagetouchid);
      })
      .catch(
        (error) => {
          console.log(error);
        }
      );
    });
  }

  openPage(page) {
    // Show Loading Controller if enabled
    if (page.showloader) {
      this.userData.LoadingControllerShow();
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot(LogoutPage);
  }

  signInWithTouchID(isenabled) {
    if (isenabled) {
      //
      // Check if TouchID is supported
      TouchID.isAvailable()
      .then(
        res => {
          TouchID.verifyFingerprint('Scan your fingerprint please')
          .then(
            res => {
              this.nav.setRoot(LoginAutoPage);
            },
            err => {console.error('Error', err)}
          );
        },
        err => {
          console.error('TouchID is not available', err)
        }
      );
    } else {
      console.log('TouchID setting is NOT enabled!');
    }
  }

}
