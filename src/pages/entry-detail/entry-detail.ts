import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';
import { Entry } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service'
<<<<<<< HEAD
import { ToastController } from 'ionic-angular';
import { Mood } from '../../models/mood';
=======
>>>>>>> 0c599a7ceacddb310839e8bb8f3196d11c7e572d

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})

export class EntryDetailPage {

  private entry: Entry;
<<<<<<< HEAD
  private buttonColor: string = '#fff';

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              private entryDataService: EntryDataServiceProvider,
              private toastCtrl: ToastController) {
=======

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              private entryDataService: EntryDataServiceProvider) {
>>>>>>> 0c599a7ceacddb310839e8bb8f3196d11c7e572d
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
<<<<<<< HEAD
    // console.log("retrieved entry:", this.entry.mood.type);
    // console.log("happy is", this.happy);
  }


  private changeMood(name: string){
    this.buttonColor = "blue"; 
=======
    console.log("retrieved entry:", this.entry.mood.type);
    console.log("happy is", this.happy);
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
>>>>>>> 0c599a7ceacddb310839e8bb8f3196d11c7e572d
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
