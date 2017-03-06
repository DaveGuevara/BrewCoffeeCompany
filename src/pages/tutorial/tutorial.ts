import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

export interface Slide {
  title: string;
  icon: string;
  color: string;
  class: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(private nav: NavController, private menu: MenuController) {
    this.slides = [
      {
        title: '<strong>Brew Coffee Co</strong>',
        description: 'Atlanta <b>hottest</b> mobile coffee bar.. ',
        icon: 'fa fa-coffee',
        color: 'introRed',
        class: 'slide-title app-title',
        image: '',
      },
      {
        title: 'Why Brew?',
        description: '<b>Brew Coffee Company</b> understands what it takes to craft the best cup of coffee. From beans to roasters, to the final stage of brewing! Our hancrafted 100% organic coffee is truly like no other. ',
        icon: 'fa fa-question',
        color: 'introYellow',
        class: 'slide-title',
        image: '',
      },
      {
        title: 'Brew Rewards',
        description: 'With our rewards program you can score free coffee',
        icon: 'fa fa-ticket',
        color: 'introLightBlue',
        class: 'slide-title',
        image: '',
      }
    ];
  }

  startApp() {
    this.nav.push(LoginPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
