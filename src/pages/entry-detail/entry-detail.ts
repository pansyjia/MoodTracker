import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';
import { CurrentPage } from '../current/current';
import { Entry } from '../../models/entry';
import { Mood } from '../../models/mood';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service'
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})

export class EntryDetailPage {

  private entry: Entry;
  private happy = new Mood("happy", 100, "/assets/imgs/happy.png", "#FFCC00", "#fff176");
  private angry = new Mood("angry", 10, "/assets/imgs/angry.png", "#DB4437", "#ff7762");
  private sad = new Mood("sad", 20, "/assets/imgs/sad.png", "#039BE5", "#63ccff");
  private okay = new Mood("okay",50, "/assets/imgs/okay.png", "#4AAE4E", "#7ee17c");

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
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();

    ///save
    let newEntry = new Entry();
    let newMood = new Mood();
    if (this.entry.mood == "happy") newMood = this.happy;
    if (this.entry.mood == "angry") newMood = this.angry;
    if (this.entry.mood == "sad") newMood = this.sad;
    if (this.entry.mood == "okay") newMood = this.okay;
    newEntry.mood = newMood;
    newEntry.location = this.entry.location;
    newEntry.text = this.entry.text;
    console.log("Now I would save the entry: ", newEntry);
    this.entryDataService.addEntry(newEntry);
    // this.navCtrl.pop();

    this.navCtrl.push(CurrentPage);
    //this.navCtrl.parent.select(1);
  }

}
