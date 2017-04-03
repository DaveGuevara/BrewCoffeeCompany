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
        let currentDate = false;

        history.forEach(snapshot => {
          let hist = snapshot.val();
          let tempHistory = ({
            $key: snapshot.key,
            date: hist.date,
            points: hist.points,
            type: hist.type,
            datecreated: hist.dateCreated
          });

          if (tempHistory.date != currentDate){
            currentDate = tempHistory.date;
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
