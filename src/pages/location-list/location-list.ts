import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Location } from '../../models/models';
import { LocationDataServiceProvider } from '../../providers/location-data-service/location-data-service';

@IonicPage()
@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  private locations: Location[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
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
    console.log('ionViewDidLoad LocationListPage');
  }

}
