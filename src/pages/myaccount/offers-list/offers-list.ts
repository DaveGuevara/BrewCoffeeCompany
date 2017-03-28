import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

//services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-offers-list',
  templateUrl: 'offers-list.html'
})
export class OffersListPage {

    Offers: FirebaseListObservable<any>;
    groupedOffers = [];

    constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {}

    ionViewDidLoad() {
      this.userData.getOffersList().on('value', (Offers) =>{
        var that = this;
        this.groupedOffers = [];
        let currentOffers = [];
        let currentDate = false;

        Offers.forEach(snapshot => {
          let offer = snapshot.val();
          let tempOffer = ({
            $key: snapshot.key,
            date: offer.date,
            content: offer.content,
            title: offer.title,
            type: offer.type
          });

          if (tempOffer.date != currentDate){
            currentDate = tempOffer.date;
            let newGroup = {
              date: currentDate,
              offers: []
            };
            currentOffers = newGroup.offers;
            that.groupedOffers.push(newGroup);
          }
          currentOffers.push(tempOffer);
        })
        // Disable loading controll when promise is complete
        this.userData.LoadingControllerDismiss();
      });
    }

  }
