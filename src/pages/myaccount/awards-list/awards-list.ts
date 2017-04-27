import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-awards-list',
  templateUrl: 'awards-list.html'
})
export class AwardsListPage {

  award: FirebaseListObservable<any>;
  groupedAwards = [];

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.userData.getAwardsList().on('value', (award) =>{
      var that = this;
      this.groupedAwards = [];
      let currentAwards = [];
      var currentDate;

      award.forEach(snapshot => {
        let awd = snapshot.val();

        if (awd.reedeemed.toString() == 'true')
        {
          let tempAward = ({
            $key: snapshot.key,
            type: awd.type,
            name: awd.name,
            description: awd.description,
            icon: "fa " + awd.icon + " introOrange customized",
            reedeemed: awd.reedeemed,
            createdDate: new Date(awd.createdDate).toJSON()
          });

          if (tempAward.createdDate != currentDate){
            currentDate = tempAward.createdDate;
            let newGroup = {
              date: currentDate,
              awards: []
            };
            currentAwards = newGroup.awards;
            that.groupedAwards.push(newGroup);
          }
          currentAwards.push(tempAward);
        };
      })
      // Disable loading controll when promise is complete
      this.userData.LoadingControllerDismiss();
    });
    }

}
