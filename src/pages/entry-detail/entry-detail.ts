import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';
import { Entry } from '../../models/models';
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
    let entryID = this.navParams.get("entryID");

    if (entryID === undefined) {
      this.entry = new Entry();
      this.entry.id = -1; // placeholder for 'temporary' entry
      this.entry.text = "";
      this.entry.mood = "happy";
      this.entry.location = "";
      this.entry.timestamp = new Date();/////change type
    }else {
        this.entry = this.entryDataService.getEntryByID(entryID);
    }

  }


  // private saveAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Mood Record Created!',
  //     subTitle: 'You just successfully created a mood record!',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }
  private changeMood(name: string){
    this.entry.mood = name;
  }

  private saveEntry() {
    let newEntry = new Entry();
    newEntry.mood = this.entry.mood;
    newEntry.location = this.entry.location;
    newEntry.text = this.entry.text;
    console.log("Now I would save the entry: ", newEntry);
    this.entryDataService.addEntry(this.entry);
    // this.navCtrl.pop();
    this.navCtrl.parent.select(2);
  }

}
