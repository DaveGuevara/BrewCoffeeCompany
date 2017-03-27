import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html'
})
export class EventsListPage {

    Events: FirebaseListObservable<any>;
    groupedEvents = [];

    constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {}

    ionViewDidLoad() {

      this.userData.getEventsList().on('value',(Events) => {
        var that = this;
        this.groupedEvents = [];
        let currentEvents = [];
        let currentDate = false;

        Events.forEach(snapshot => {
          let event = snapshot.val();
          let tempEvent = ({
            $key: snapshot.key,
            date: event.date,
            title: event.title,
            location: event.location,
            address: event.address,
            city: event.city,
            st: event.st,
            zip: event.zip,
            starttime: event.startTime,
            endtime: event.endTime,
          });

          if (tempEvent.date != currentDate){
            currentDate = tempEvent.date;
            let newEvent = {
              date: currentDate,
              events: []
            };
            currentEvents = newEvent.events;
            that.groupedEvents.push(newEvent);
          }
          currentEvents.push(tempEvent);
        })
        // Disable loading controll when promise is complete
        this.userData.LoadingControllerDismiss();
      });
    }

  }
