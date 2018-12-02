import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';
import { Entry } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service'
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})

export class EntryDetailPage {

  private entry: Entry;

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              private entryDataService: EntryDataServiceProvider,
              private toastCtrl: ToastController) {
    let entryID = this.navParams.get("entryID");

    if (entryID === undefined) {
      this.entry = new Entry();
      this.entry.id = -1; 
      this.entry.text = "";
      this.entry.mood = "happy";
      this.entry.location = "";
      this.entry.timestamp = new Date();
    }else {
        this.entry = this.entryDataService.getEntryByID(entryID);
    }
    // console.log("retrieved entry:", this.entry.mood.type);
    // console.log("happy is", this.happy);
  }


  private changeMood(name: string){
    this.entry.mood = name;
  }

  private saveEntry() {
    ///present toast
    let toast = this.toastCtrl.create({
      message: 'A mood record was added successfully',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();

    ///save
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
