import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'budget-list.html'
})

export class BudgetListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      public nav: NavController) {}
  

  add() {
    
  }
  
}