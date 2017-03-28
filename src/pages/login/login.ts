import { Component } from '@angular/core';

import { AlertController, MenuController , NavController } from 'ionic-angular';

// app pages
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { DashboardPage} from '../myaccount/dashboard/dashboard';

// services
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login: {email?: string, password?: string} = {};
  submitted = false;

  constructor(
    public alertController: AlertController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userData: UserData) {

    this.login.email = 'david@ggc.edu';

   }

  onLogin(form) {

    this.submitted = true;
    if (form.valid) {
      this.userData.LoadingControllerShow();
      this.userData.login(this.login)
      .then(() => {
          this.LoginSuccess();
        }
      )
      .catch(
        (error) => {
          this.userData.LoadingControllerDismiss();
          this.LoginError(error);
        }
      );
    }
  }

  LoginSuccess() {
    setTimeout(() => {
      this.navCtrl.setRoot(DashboardPage, {}, {animate: true, direction: 'forward'});
    }, 1000);
  }

  LoginError(error) {
    let alert = this.alertController.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //do handler stuff here
          }
        }
      ]
    });
    alert.present();
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  onForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);
  }

}
