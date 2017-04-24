import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

import 'rxjs';
//import * as moment from 'moment';

// firebase/angularfire
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

//import { IAccount } from '../models/account.model';

@Injectable()
export class UserData {

  loading: any;
  storagetouchid = '';
  storageemail = '';
  storagepwd = '';
  appversion = '';
  user;
  userauth;
  userdata;
  userSettings;
  rewardsdata;
  offersdata;
  eventdata;
  menudata;
  historylist;
  profilepicdata;

  constructor(
    public af: AngularFire,
    public loadingCtrl: LoadingController) {

    this.userdata = firebase.database().ref('/users/');
    this.rewardsdata = firebase.database().ref('/rewards/');
    this.offersdata = firebase.database().ref('/offers/');
    this.eventdata = firebase.database().ref('/Events/');
    this.menudata = firebase.database().ref('/Menu/');
    //this.profilepicdata = firebase.storage().ref('/profilepics/');
  }

  LoadingControllerShow() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Please wait...',
    });
    this.loading.present();
  }

  LoadingControllerDismiss() {
    //TODO: Remove .catch once fix has been implemented
    // https://github.com/driftyco/ionic/issues/10046#issuecomment-274074432
    this.loading.dismiss().catch(() => console.log('error on dismiss'));
  }

  /**
  * Creates a new user using the plain vanilla Firebase SDK
  */
  createUser(credentials) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((authData) => {
        this.userauth = authData;
        this.user = credentials;
        this.createInitialSetup();
        this.saveLocalStorage(credentials);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  login(credentials) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.af.auth.login({email: credentials.email,password: credentials.password})
      .then((authData) => {
        this.userauth = authData;
        this.getUserData();
        this.saveLocalStorage(credentials);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  logout() {
    return firebase.auth().signOut();
  }

  createInitialSetup() {

    this.createUserProfile();
    this.createRewards();
    this.createDefaultAwards();
    this.createDefaultHistory();
  }

  createUserProfile() {
    // Set basic user profile defaults
    var profile = {
      datecreated: firebase.database['ServerValue']['TIMESTAMP'],
      email: this.user.email,
      enabletouchid: 'false',
      fullname: this.user.fullname,
      nickname: this.user.fullname,
      profilepic: 'http://www.gravatar.com/avatar?d=mm&s=140',
    };
    //this.user.defaultdate = profile.defaultdate;
    this.user.enabletouchid = profile.enabletouchid;
    this.user.profilepic = profile.profilepic;
    // Save user profile
    this.userdata.child(this.userauth.uid).update(profile);
  }
  createRewards(){
    // Set basic REWARD defaults
    var rewardsmember = {
        points: '0',
        updated: firebase.database['ServerValue']['TIMESTAMP'],
    };

    // Create node under REWARDSs and get the key
    this.user.rewardsid = this.rewardsdata.push().key;
    // Save key into the user->rewardsid node
    this.userdata.child(this.userauth.uid).update({rewardsid : this.user.rewardsid});
    // Add member to Earn node under Rewards
    this.rewardsdata.child(this.user.rewardsid + "/earn/").update(rewardsmember);
  }
  createDefaultAwards(){
    var refTypes = this.rewardsdata.child(this.user.rewardsid + "/awards/");
       refTypes.push({ name: 'Join', type: 'join-award', description: ' ', icon: 'ios-cash-outline', reedeemed: 'false', createdDate: firebase.database['ServerValue']['TIMESTAMP'] });
  }
  createDefaultHistory(){
    var refTypes = this.rewardsdata.child(this.user.rewardsid + "/history/");
       refTypes.push({ name: 'Join', type: 'join-award', points: '0', createdDate: firebase.database['ServerValue']['TIMESTAMP'] });
  }


  //
  // NATIVE STORAGE
  //-----------------------------------------------------------------------
  saveLocalStorage(credentials) {
    this.setUserEmail(credentials.email);
    this.setUserPwd(credentials.password);
  }
  setUserEmail(email) {
    NativeStorage.setItem('storageemail', {property: email})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }
  getStorageEmail() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      NativeStorage.getItem('storageemail')
      .then((data) => {
        this.storageemail = data.property;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
  setUserPwd(pwd) {
    NativeStorage.setItem('storagepwd', {property: pwd})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }
  getStoragePwd() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      NativeStorage.getItem('storagepwd')
      .then((data) => {
        this.storagepwd = data.property;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
  setUserTouchID(touchid) {
    NativeStorage.setItem('storagetouchid', {property: touchid})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }
  getStorageTouchID() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      NativeStorage.getItem('storagetouchid')
      .then((data) => {
        this.storagetouchid = data.property;
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
  clearNativeStorage() {
    NativeStorage.clear();
  }


  //
  // PERSONAL PROFILE
  //-----------------------------------------------------------------------
  getUserData() {
    const thisuser$ : FirebaseObjectObservable<any> = this.af.database.object('/users/' + this.userauth.uid);
    thisuser$.subscribe((val) => {
      this.user = val;
    });
  }
  updateTouchID(ischecked: boolean) {
    this.setUserTouchID(ischecked);
    this.userdata.child(this.userauth.uid).update({'enabletouchid' : ischecked});
  }
  updateName(newname: string) {
    this.userdata.child(this.userauth.uid).update({'fullname' : newname});
  }
  updateEmail(newEmail: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updateEmail(newEmail)
      .then(function() {
        this.user.email = newEmail;
        this.updateEmailNode(newEmail);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }
  updatePassword(newPassword: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updatePassword(newPassword)
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }
  deleteData() {
    //
    // Delete ALL user data
    //this.housedata.child(this.user.houseid).remove();
    this.userdata.child(firebase.auth().currentUser.uid).remove();
  }
  deleteUser() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.delete()
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }
  savePicture(pic) {
    this.profilepicdata.child(firebase.auth().currentUser.uid).child('profilepicture.png')
    .putString(pic, 'base64', {contentType: 'image/png'}).then((savedpicture) => {
      this.userdata.child(firebase.auth().currentUser.uid).update({'profilepic' : savedpicture.downloadURL});
    });
  }

  updateEmailNode(newemail) {
    this.userdata.child(this.userauth.uid).update({'email' : newemail});
  }



  //
  // REWARDS
  //-----------------------------------------------------------------------
  getRewards(uid): FirebaseListObservable<any[]> {
    return this.af.database.list('/rewards/' + this.userauth.uid);
  }
  addRewardsPoints(points) {
    this.rewardsdata.child(this.user.rewardsid + "/earn/").update({ 'points' : points });
  }
  getRewardsPoints()
  {
    return this.rewardsdata.child(this.user.rewardsid + '/earn');
  }

  //
  // AWARDS
  //-----------------------------------------------------------------------
  getAwardsList() {
    return this.rewardsdata.child(this.user.rewardsid + '/awards/').orderByChild('createdDate');
  }
  addAwards(){
    var newAward = this.rewardsdata.child(this.user.rewardsid + "/awards/");
    newAward.push({ name: 'Earn', type: 'earn-award', description: 'You have earned 10 points, that gives you $5 credit to your next purchase.', icon: 'ios-cash-outline', reedeemed: 'false', createdDate: firebase.database['ServerValue']['TIMESTAMP'] });
  }
  redeemAwards(awardID) {
    this.rewardsdata.child(this.userauth.uid + "/rewards/" + awardID).push({ redeemed: true });
  }
  getOpenAward(){
    //return this.af.database.list('/rewards/' + this.user.rewardsid + '/awards/', {
    //  query: {
    //    orderByChild: 'createdDate'
    //  }
    //}).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    return this.rewardsdata.child(this.user.rewardsid + '/awards/').orderByChild('datecreated').limitToFirst(1);
  }

  //
  // HISTORY
  //-----------------------------------------------------------------------
  getHistoryList() {
    return this.rewardsdata.child(this.user.rewardsid + '/history').orderByChild('datecreated');
  }
  addHistory(name, type, points) {
    var newHistory = this.rewardsdata.child(this.user.rewardsid + "/history/");
    newHistory.push({ name: name, type: type, points: points, createdDate: firebase.database['ServerValue']['TIMESTAMP'] });
  }

 //
 // OFFERS
 //-----------------------------------------------------------------------
 getOffersList() {
   return this.offersdata.orderByChild('date');
 }

 //
 // EVENTS
 //-----------------------------------------------------------------------
 getEventsList() {
   return this.eventdata.orderByChild('month');
 }

 //
 // MENU
 //-----------------------------------------------------------------------
 getMenuList() {
   return this.menudata.orderByChild('category');
 }


  //
  // MISCELANEOUS
  //-----------------------------------------------------------------------

  handleData(snapshot)
  {
    try {
      // Firebase stores everything as an object, but we want an array.
      var keys = Object.keys(snapshot.val);
      console.log('keys: ', keys, snapshot.val);
      // variable to store the todos added
      var data = [];
      // Loop through the keys and push the todos into an array
      for( var i = 0; i < keys.length; ++i)
      {
        data.push(snapshot.val()[keys[i]]);
      }
      console.log(data);
    }
    catch (error) {
      console.log('catching', error);
    }
  }


  /*
  // Find an item in the array
  //http://stackoverflow.com/questions/2713599/how-do-i-select-an-item-out-of-a-javascript-array-when-i-only-know-a-value-for-o
  find_in_array(arr, name, value) {
    for (var i = 0, len = arr.length; i<len; i++) {
        if (name in arr[i] && arr[i][name] == value) return i;
    };
    return false;
  }
  var id = find_in_array(measurements.page[0].line, 'lineid', 22);
  */


  //
  // DATA MAINTENANCE
  //-----------------------------------------------------------------------

  houseMember() {

  }


  // Move or copy a Firebase path to a new location
  // https://gist.github.com/katowulf/6099042
  copyFbRecord(oldRef, newRef) {
    oldRef.once('value', function(snap) {
      newRef.set( snap.val(), function(error) {
        if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      });
    });
  }
  moveFbRecord(oldRef, newRef) {
    oldRef.once('value', function(snap) {
      newRef.set( snap.val(), function(error) {
        if( !error ) {  oldRef.remove(); }
        else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      });
    });
  }


}
