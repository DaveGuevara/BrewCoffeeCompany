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
      title: 'Redeemable only once!',
      subTitle: 'Are you sure you want to redeem this award now?',
      buttons: [
          {
            text:'OK',
            handler: () => {
              //what if its ok?
              this.userData.redeemAwards(this.award.$key)
              this.userData.addHistory("Redeem","Redeemed Award", 0)
              this.navCtrl.pop();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //what to do if cancel?
            }
          }
      ]
    });
    alert.present();
  }
}
