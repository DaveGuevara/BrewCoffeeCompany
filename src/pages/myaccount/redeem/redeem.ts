import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

//services
import { UserData } from '../../../providers/user-data';



@Component({
  selector: 'page-redeem',
  templateUrl: 'redeem.html'
})

export class RedeemPage {
  award: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public userData: UserData) {
      this.award = navParams.data.award;
    }

  ionViewDidLoad() {}

  useAward(){
    let alert = this.alertCtrl.create({
      title: 'You are Done!',
      subTitle: 'your submission has been accepted',
      buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //what to do if cancel?
            }
          },
          {
            text:'OK',
            handler: () => {
              //what if its ok?
            }
          }
      ]
    });
    alert.present();
  }
}
