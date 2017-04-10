import { Component } from '@angular/core';

import { PopoverController, ViewController } from 'ionic-angular';

// services
import { UserData } from '../../providers/user-data';

@Component({
  template: `
  
  `
})

export class PopoverPage {

  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  conferenceDate = '2047-05-17';

  constructor(
    public popoverCtrl: PopoverController,
    public userData: UserData) {}

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
