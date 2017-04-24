import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

// models
import { Earn } from '../../../models/earn.model';

@Component({
  selector: 'page-earn',
  templateUrl: 'earn.html'
})

export class EarnPage {
   displayValue = 0;
   clearValue;
   periodEntered: boolean = false;
   decimals = 0;
   currentpoints;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public userData: UserData) {
       this.currentpoints = this.navParams.data.currentPoints;
    }

    ionViewDidLoad(){}

    goBack() {
       this.nav.pop();
     }

     digitClicked(digit) {
       switch (digit) {
         case 'C': {
           this.reset();
           break;
         }
         case '.': {
           this.periodEntered = true;
           this.displayValue = this.displayValue + digit;
           break;
         }
         case 'B': {
           let amt = this.displayValue.toString();
           let amtDisplay = parseFloat(amt.substring(0, amt.length - 1));
           if (amtDisplay.toString() === 'NaN') {
             this.reset();
           } else {
             this.displayValue = amtDisplay;
           }
           this.clearValue = false;
           if (this.periodEntered) {
             this.decimals--;
           }
           break;
         }
         case 'D': {
           // check to see if the earn code has been used before (today) if not, proceed else show message.
           if (true)
           {
             var NewPoints = Number(this.currentpoints) + Number(1);
             if (NewPoints == 10)
             {
               // create award and start over
               this.userData.addAwards();
               this.userData.addHistory('Award', 'New Award', 0);
               NewPoints = 0;
             }
             this.userData.addRewardsPoints(NewPoints);
             this.userData.addHistory('Earn', 'Purchase', 1);
           }
           this.showAlert();
           this.goBack();
           break;
         }
         default: {
           if (this.periodEntered) {
             if (this.decimals < 2) {
               this.displayValue = this.displayValue + digit;
               this.decimals++;
             }
           } else {
             if (this.displayValue === 0) {
               this.displayValue = digit;
             } else {
               this.displayValue = this.displayValue + digit;
             }
           }
         }
       }
     }

     reset() {
       this.displayValue = 0;
       this.clearValue = true;
       this.periodEntered = false;
       this.decimals = 0;
     }

     showAlert(){
       let alert = this.alertCtrl.create({
         title: 'You are Done!',
         subTitle: 'your submission has been accepted',
         buttons: ['OK']
       });
       alert.present();
     }
}
