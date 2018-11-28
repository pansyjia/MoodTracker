import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';
import { Entry } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service'

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})

export class EntryDetailPage {

  private entry: Entry;

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              private entryDataService: EntryDataServiceProvider) {
    // let entryID = this.navParams.get("entryID");
    //
    // if (entryID === undefined) {
    //   this.entry = new Entry();
    //   this.entry.id = -1; // placeholder for 'temporary' entry
    //   this.entry.text = "";
    //   this.entry.mood = "";
    //   this.entry.location = "";
    //   this.entry.timestamp = new Date();/////change type
    // }else {
    //     this.entry = this.entryDataService.getEntryByID(entryID);
    // }
    // console.log("retrieved entry:", this.entry);
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
    newEntry.mood = event.srcElement.id;
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
    // this.entryDataService.addEntry(this.entry);
    // this.navCtrl.pop();
  }

}
