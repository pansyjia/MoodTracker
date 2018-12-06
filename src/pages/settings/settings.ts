import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Location } from "../../models/models";
import { LocationDataServiceProvider } from "../../providers/location-data-service/location-data-service";

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

  private locations: Location[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private locationService: LocationDataServiceProvider) {
    this.locationService.getObservable().subscribe(
      (update) => {
        this.locations = this.locationService.getLocations();
        console.log(this.locations);
      },
      (err) => {
        console.log('this.locationService.getObservable().subscribe :', err);
      });
    this.locations = this.locationService.getLocations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  dev_switchAccount() {

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
            this.locationService.initLocations();
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
}
