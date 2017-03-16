import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { BrewApp } from './app.component';

// app pages
import { AboutPage, PopoverPage } from '../pages/about/about';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { LoginPage } from '../pages/login/login';
import { LoginAutoPage } from '../pages/loginauto/loginauto';
import { LogoutPage } from '../pages/logout/logout';

// myinfo
import { ChangeEmailPage } from '../pages/myinfo/changeemail/changeemail';
import { ChangeNamePage } from '../pages/myinfo/changename/changename';
import { ChangePasswordPage } from '../pages/myinfo/changepassword/changepassword';
import { PersonalProfilePage } from '../pages/myinfo/personalprofile/personalprofile';
import { ProfileDetailsPage } from '../pages/myinfo/profiledetails/profiledetails';
import { PersonalProfilePhotoPage } from '../pages/myinfo/personalprofilephoto/personalprofilephoto';

// my account pages
import { DashboardPage } from '../pages/myaccount/dashboard/dashboard';
import { MenuListPage } from '../pages/myaccount/menu-list/menu-list';
import { EventsListPage } from '../pages/myaccount/events-list/events-list';
import { HistoryListPage } from '../pages/myaccount/history-list/history-list';
import { OffersListPage } from '../pages/myaccount/offers-list/offers-list';
import { AwardsListPage } from '../pages/myaccount/awards-list/awards-list';

// mysettings
import { SettingsPage } from '../pages/mysettings/settings/settings';

import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';

// services
import { UserData } from '../providers/user-data';
//import { AccountData } from '../providers/account-data';

//Angular Fire 2
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// FIREBASE connection setttings
export const firebaseConfig = {
    apiKey: "AIzaSyBMxGMvYXzZfwEc_eUNb0bF7TGM4jaNTrY",
    authDomain: "brewcoffeecompany-aabb2.firebaseapp.com",
    databaseURL: "https://brewcoffeecompany-aabb2.firebaseio.com",
    storageBucket: "brewcoffeecompany-aabb2.appspot.com",
    messagingSenderId: "519692379294"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

//  IONIC ICLOUD
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};


@NgModule({
  declarations: [
    BrewApp,
    AboutPage,
    PopoverPage,
    ForgotPasswordPage,
    LoginPage,
    LoginAutoPage,
    LogoutPage,
    ChangeEmailPage,
    ChangeNamePage,
    ChangePasswordPage,
    PersonalProfilePage,
    ProfileDetailsPage,
    PersonalProfilePhotoPage,
    DashboardPage,
    MenuListPage,
    EventsListPage,
    HistoryListPage,
    OffersListPage,
    AwardsListPage,
    SettingsPage,
    SignupPage,
    TutorialPage
  ],
  imports: [
    IonicModule.forRoot(BrewApp, {
      popoverEnter: 'popover-md-pop-in',
      popoverLeave: 'popover-md-pop-out'
    }),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BrewApp,
    AboutPage,
    PopoverPage,
    ForgotPasswordPage,
    LoginPage,
    LoginAutoPage,
    LogoutPage,
    ChangeEmailPage,
    ChangeNamePage,
    ChangePasswordPage,
    PersonalProfilePage,
    ProfileDetailsPage,
    PersonalProfilePhotoPage,
    DashboardPage,
    MenuListPage,
    EventsListPage,
    HistoryListPage,
    OffersListPage,
    AwardsListPage,
    SettingsPage,
    SignupPage,
    TutorialPage
  ],
  //providers: [UserData, TransactionData, AccountData, CategoryData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
  providers: [UserData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
