import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// app pages
import { LoginPage } from '../login/login';
import { AccountListPage } from '../mymoney/account-list/account-list';

// services
import { UserData } from '../../providers/user-data';

// firebase
declare var firebase: any;

@Component({
  selector: 'page-loginauto',
  templateUrl: 'loginauto.html'
})

export class LoginAutoPage {

  credentials: any;

  constructor(
    public nav: NavController,
    public userData: UserData) {

      this.userData.LoadingControllerShow();

      // Get email from storage
      this.userData.getStorageEmail()
      .then((data) => {
        //console.log(this.userData.storageemail);
        
        // Get pwd from storage
        this.userData.getStoragePwd()
        .then((data) => {
          //console.log(this.userData.storagepwd);

          // Auto Login
          this.credentials = {email: this.userData.storageemail,password: this.userData.storagepwd};
          this.autoLogin(this.credentials);

        })
        .catch(
          (error) => {
            console.log(error);
            this.userData.LoadingControllerDismiss();
          }
        );
      })
      .catch(
        (error) => {
          console.log(error);
          this.userData.LoadingControllerDismiss();
        }
      );
    }

    autoLogin(credentials) {
      this.userData.login(credentials)
      .then(() => {
          this.LoginSuccess();
        }        
      )
      .catch(
        (error) => {     
          this.nav.setRoot(LoginPage);
          this.userData.LoadingControllerDismiss();
        }
      );
    }

    LoginSuccess() {
      setTimeout(() => {
          this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
        }, 1000);    
    }

}