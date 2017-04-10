import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

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
  public earn: any;
  earned: number;
  pending: number;
  percent: number;

  constructor(
    public nav: NavController,
    public alertController: AlertController,
    public userData: UserData) {}
  /*
      this.userData.getRewardsPoints().on('value', (data)=> {
        this.earn = data.val();
        this.earned = this.earn.points;
        this.pending = 10 - this.earned;
        this.percent = (this.earned/10) * 100;
      });
    }
 */

  ionViewDidLoad() {
    this.userData.getRewardsPoints().on('value', (data)=> {
      this.earn = data.val();
      this.earned = this.earn.points;
      this.pending = 10 - this.earned;
      this.percent = (this.earned/10) * 100;
  //  });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [this.earned,this.pending],
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
            elements: {
              arc: {
      					roundedCornersFor: 0
      				},
      				center: {
      					// the longest text that could appear in the center
      					maxText: '100%',
      					text: this.percent + '%',
      					fontColor: '#ffffff',
      					fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      					fontStyle: 'normal',
      					// fontSize: 12,
      					// if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
      					// if these are not specified either, we default to 1 and 256
      					minFontSize: 1,
      					maxFontSize: 256,
      				}
    			},
          chartArea:{
            backgroundColor: 'rgba(0,0,0,0)'
          },
          tooltips:{
            enabled: false
          }
      }
    });
    });
    this.userData.LoadingControllerDismiss();
  }


  Earn() {
    let tempEarn = new Earn(null,"1");
    this.nav.push(EarnPage, {paramAccount: tempEarn});
  }

}




//  ---- chart Extended plugins ------
// round corners
Chart.pluginService.register({
  afterUpdate: function (chart) {
    if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
      var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
      arc.round = {
        x: (chart.chartArea.left + chart.chartArea.right) / 2,
        y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
        radius: (chart.outerRadius + chart.innerRadius) / 2,
        thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
        backgroundColor: arc._model.backgroundColor
      }
    }
  },

  afterDraw: function (chart) {
    if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
      var ctx = chart.chart.ctx;
      var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
      var startAngle = Math.PI / 2 - arc._view.startAngle;
      var endAngle = Math.PI / 2 - arc._view.endAngle;

      ctx.save();
      ctx.translate(arc.round.x, arc.round.y);
      console.log(arc.round.startAngle)
      ctx.fillStyle = arc.round.backgroundColor;
      ctx.beginPath();
      ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
      ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  },
});

Chart.pluginService.register({
  afterUpdate: function (chart) {
    if (chart.config.options.elements.center) {
      var helpers = Chart.helpers;
      var centerConfig = chart.config.options.elements.center;
      var globalConfig = Chart.defaults.global;
      var ctx = chart.chart.ctx;

      var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
      var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

      if (centerConfig.fontSize)
        var fontSize = centerConfig.fontSize;
      // figure out the best font size, if one is not specified
      else {
        ctx.save();
        var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
        var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
        var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

        do {
          ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
          var textWidth = ctx.measureText(maxText).width;

          // check if it fits, is within configured limits and that we are not simply toggling back and forth
          if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
            fontSize += 1;
          else {
            // reverse last step
            fontSize -= 1;
            break;
          }
        } while (true)
        ctx.restore();
      }

      // save properties
      chart.center = {
        font: helpers.fontString(fontSize, fontStyle, fontFamily),
        fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
      };
    }
  },
  afterDraw: function (chart) {
    if (chart.center) {
      var centerConfig = chart.config.options.elements.center;
      var ctx = chart.chart.ctx;

      ctx.save();
      ctx.font = chart.center.font;
      ctx.fillStyle = chart.center.fillStyle;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.fillText(centerConfig.text, centerX, centerY);
      ctx.restore();
    }
  },
})
