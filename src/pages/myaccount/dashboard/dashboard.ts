import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
//  Services
import { UserData } from '../../../providers/user-data';
// App page-dashboard
import { EarnPage } from  '../earn/earn';
// Models
import { Earn } from '../../../models/earn.model';
// Chart.js
import { Chart } from 'chart.js';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  constructor(
    public nav: NavController,
    public alertController: AlertController,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

    type: 'doughnut',
    data: {
        datasets: [{
            data: [.33,.66],
            backgroundColor: [
              'rgba(40, 165, 76, 1)',
              'rgba(128, 128, 128, 1)'
            ],
            hoverBackgroundColor: [
                "#28a54c",
                "#808080"
            ]
          }]
      },
      options: {
          chartArea:{
            backgroundColor: 'rgba(0,0,0,0)'
          },
          tooltips:{
            enabled: false
          }
      }
    });

    this.userData.LoadingControllerDismiss();
  }


  Earn() {
    let tempEarn = new Earn(null,"1");
    this.nav.push(EarnPage, {paramAccount: tempEarn});
  }

}
