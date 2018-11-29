import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';
import { Entry } from '../../models/entry';

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})

export class EntryDetailPage {

  private entryLocation: string;
  private entryText: string;

  private currentTime = new Date();
  alertCtrl: any;

  constructor(public navCtrl: NavController, public navParams:
    NavParams) {

  }


  private saveAlert() {
    const alert = this.alertCtrl.create({
      title: 'Mood Record Created!',
      subTitle: 'You just successfully created a mood record!',
      buttons: ['OK']
    });
    alert.present();
  }

  private savemood(){
    let newEntry = new Entry();

    // if (event.srcElement.id == "happy") newEntry.mood = this.happy;
    // if (event.srcElement.id == "angry") newEntry.mood = this.angry;
    // if (event.srcElement.id == "sad") newEntry.mood = this.sad;
    // if (event.srcElement.id == "okay") newEntry.mood = this.okay;
    newEntry.location = this.entryLocation;
    newEntry.text = this.entryText;
    console.log("Now I would save the mood: ", event.srcElement.id);
    // this.entryDataService.addEntry(this.entry);
    // this.navCtrl.pop();
  }

  private saveEntry() {
    let newEntry = new Entry();
    newEntry.location = this.entryLocation;
    newEntry.text = this.entryText;

    console.log("Now I would save the entry: ", newEntry);
    }


}
