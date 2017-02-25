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
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(private nav: NavController, private menu: MenuController) {
    this.slides = [
      {
        title: '<strong>MobileCoffee</strong>',
        description: 'Let us Come to you <br /></b>',
        icon: 'fa fa-usd',
        color: 'introGreen',
        class: 'slide-title app-title',
        image: '',
      },
      {
        title: 'What is MobileCofee?',
        description: 'MobileCoffee is an application created for coffee lovers who want access to premium coffee from their phones!',
        icon: 'fa fa-lightbulb-o',
        color: 'introYellow',
        class: 'slide-title',
        image: '',
      },
      {
        title: ' Why Should You Use it?',
        description: 'MobileCoffee lets you get the caffeine you need from your phone',
        icon: 'fa fa-question',
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
    // This is where we add some code for the main menu
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // as we leave the page we will enable the menu
    this.menu.enable(true);
  }

}
