import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';


import { Location } from "../../models/models";
import { LocationDataServiceProvider } from "../../providers/location-data-service/location-data-service";
import { UsersserviceProvider } from "../../providers/usersservice/usersservice";
import { LoginPage } from "../login/login";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  // private nearbyLocations: Location[];
  public userName: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private localNotifications: LocalNotifications,
              private locationService: LocationDataServiceProvider,
              private usersService: UsersserviceProvider) {
    this.locationService.getObservable().subscribe(
      (update) => {
        // this.nearbyLocations = this.locationService.getNearbyLocations();
      },
      (err) => {
        console.log('this.locationService.getObservable().subscribe :', err);
      });
    // this.nearbyLocations = this.locationService.getNearbyLocations();
    this.userName = this.usersService.getProfileName();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  dev_switchAccount() {
    this.usersService.signout();
    this.navCtrl.setRoot(LoginPage);
  }

  dev_delAccount() {

  }

  dev_initLocations() {
    const confirm = this.alertCtrl.create({
      title: 'Initialize Database?',
      message: 'It will overwrite the default locations, but will not affect user-generated locations.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Initialize Database Cancelled');
          }
        },
        {
          text: 'Overwrite',
          handler: () => {
            this.locationService.dev_initLocations();
            const alert = this.alertCtrl.create({
              title: 'Finished!',
              subTitle: 'Location database already reset.',
              buttons: ['OK']
            });
            alert.present();
          }
        }
      ]
    });
    confirm.present();
  }

  dev_testNotification() {
    console.log(new Date());
    console.log(new Date(new Date().getTime() + 360000));
    this.localNotifications.schedule({
      title: "Mood Tracker",
      text: 'How are you? It only takes a second - record your current feelings!',
      trigger: {at: new Date(new Date().getTime() + 360000)},
      // actions: [
      //     {id: 'createNew', title: 'Create New Mood'},
      //     {id: 'notifyLater', title: 'Maybe Later'}],
      attachments: ["../../assets/imgs/Happy.png"]
    });
  }

  dev_testGPS() {
    let currentLocation = this.locationService.getCurrentGPS();
    if (currentLocation === 'unknown') {
      const alert = this.alertCtrl.create({
        title: "Can't Find your location!",
        subTitle: "Please check your privacy settings",
        buttons: ['OK']
      });
      alert.present();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Find your location!',
        subTitle: "Lat: " + currentLocation.lat + " <br> Long: " + currentLocation.lng,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  dev_fakeGeolocation() {
    this.locationService.dev_fakeGeolocation();
    const alert = this.alertCtrl.create({
      title: 'Fake your GPS Data!',
      subTitle: 'Please relaunch to reset',
      buttons: ['OK']
    });
    alert.present();
  }

}
