import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

//services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html'
})
export class MenuListPage {

  Menu: FirebaseListObservable<any>;
  groupedMenu = [];

    constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {}

    ionViewDidLoad() {
      this.userData.getMenuList().on('value',(Menu) => {
        var that = this;
        this.groupedMenu = [];
        let currentMenu = [];
        let currentCategory = false;

        Menu.forEach(snapshot => {
          let menu = snapshot.val();
          let tempMenu = ({
            $key: snapshot.key,
            category: menu.category,
            name: menu.name,
            description: menu.description,
          });

          if (tempMenu.category != currentCategory){
            currentCategory = tempMenu.category;
            let newMenu = {
              category: currentCategory,
              menu: []
            };
            currentMenu = newMenu.menu;
            that.groupedMenu.push(newMenu);
          }
          currentMenu.push(tempMenu);
        })
        // Disable loading controll when promise is complete
        this.userData.LoadingControllerDismiss();
      });
    }
  }
