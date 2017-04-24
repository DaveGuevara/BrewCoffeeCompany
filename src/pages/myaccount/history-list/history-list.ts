import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-history-list',
  templateUrl: 'history-list.html'
})
export class HistoryListPage {

    history: FirebaseListObservable<any>;
    groupedHistory = [];

    constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {}

    ionViewDidLoad() {

      this.userData.getHistoryList().on('value', (history) =>{
        var that = this;
        this.groupedHistory = [];
        let currentHistory = [];
        let currentDate;
        history.reverse;

        history.forEach(snapshot => {
          let hist = snapshot.val();
          let tempHistory = ({
            $key: snapshot.key,
            //date: hist.date,
            points: hist.points,
            type: hist.type,
            //datecreated: new Date(hist.createdDate).toDateString()
            datecreated: new Date(hist.createdDate).toLocaleDateString()
          });

          if (tempHistory.datecreated != currentDate){
            currentDate = tempHistory.datecreated;
            let newGroup = {
              date: currentDate,
              history: []
            };
            currentHistory = newGroup.history;
            that.groupedHistory.push(newGroup);
          }
          currentHistory.push(tempHistory);
        })
        // Disable loading controll when promise is complete
        this.userData.LoadingControllerDismiss();
      });
    }

  }
