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
import { AccountPage } from '../pages/mymoney/account/account';
import { AccountListPage } from '../pages/mymoney/account-list/account-list';
import { BudgetListPage } from '../pages/mymoney/budget-list/budget-list';
import { CategoryPage } from '../pages/mymoney/category/category';
import { CategoryListPage } from '../pages/mymoney/category-list/category-list';
import { PayeeListPage } from '../pages/mymoney/payee-list/payee-list';
import { PayeePage } from '../pages/mymoney/payee/payee';
import { RecurringListPage } from '../pages/mymoney/recurring-list/recurring-list';
import { ReportListPage } from '../pages/mymoney/report-list/report-list';
import { TransactionsPage } from '../pages/mymoney/transaction-list/transaction-list';
import { TransactionPage } from '../pages/mymoney/transaction/transaction';


// mysettings
import { SettingsPage } from '../pages/mysettings/settings/settings';

import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';

// services
import { UserData } from '../providers/user-data';
//import { TransactionData } from '../providers/transaction-data';
//import { AccountData } from '../providers/account-data';
//import { CategoryData } from '../providers/category-data';

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
    AccountPage,
    AccountListPage,
    BudgetListPage,
    CategoryPage,
    CategoryListPage,
    PayeeListPage,
    PayeePage,
    RecurringListPage,
    ReportListPage,
    TransactionsPage,
    TransactionPage,
    SettingsPage,
    SignupPage,
    TutorialPage
  ],
  imports: [
    IonicModule.forRoot(BrewApp, {
      popoverEnter: 'popover-md-pop-in',
      popoverLeave: 'popover-md-pop-out'
    }),
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
    AccountPage,
    AccountListPage,
    BudgetListPage,
    CategoryPage,
    CategoryListPage,
    PayeeListPage,
    PayeePage,
    RecurringListPage,
    ReportListPage,
    TransactionsPage,
    TransactionPage,
    SettingsPage,
    SignupPage,
    TutorialPage
  ],
  //providers: [UserData, TransactionData, AccountData, CategoryData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
  providers: [UserData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
