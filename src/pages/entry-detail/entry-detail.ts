import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})

export class EntryDetailPage {

  // ChartView = ChartPage;
  // AddEntry = EntryDetailPage;
  // ListView =  HomePage;

  private currentTime = new Date();
  alertCtrl: any;

  constructor(public navCtrl: NavController) {

  }


  saveAlert() {
    const alert = this.alertCtrl.create({
      title: 'Mood Record Created!',
      subTitle: 'You just successfully created a mood record!',
      buttons: ['OK']
    });
    alert.present();
  }
}
