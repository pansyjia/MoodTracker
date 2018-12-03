import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';
import { Entry } from '../../models/entry';
import { Mood } from '../../models/mood';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service'

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})

export class EntryDetailPage {

  private entry: Entry;
  private happy = new Mood("happy", 100, "/assets/imgs/Happy-b.png", "#FFCC00", "#fff176");
  private angry = new Mood("angry", -10, "/assets/imgs/Angry-b.png", "#DB4437", "#ff7762");
  private sad = new Mood("sad", -20, "/assets/imgs/Sad-b.png", "#039BE5", "#63ccff");
  private okay = new Mood("okay", 50, "/assets/imgs/Okay-b.png", "#4AAE4E", "#7ee17c");

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              private entryDataService: EntryDataServiceProvider) {
    let entryID = this.navParams.get("entryID");

    if (entryID === undefined) {
      this.entry = new Entry();
      this.entry.id = -1; // placeholder for 'temporary' entry
      this.entry.text = "";
      this.entry.mood = this.happy;
      this.entry.location = "";
      this.entry.timestamp = new Date();/////change type
    }else {
        this.entry = this.entryDataService.getEntryByID(entryID);
    }
    console.log("retrieved entry:", this.entry.mood.type);
  }


  // private saveAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Mood Record Created!',
  //     subTitle: 'You just successfully created a mood record!',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  private savemood(){
    console.log("Now I would save the mood: ", event.srcElement.id);
  }

  private saveEntry(newMood: Mood) {
    let newEntry = new Entry();
    if (event.srcElement.id == "happy") newMood = this.happy;
    if (event.srcElement.id == "angry") newMood = this.angry;
    if (event.srcElement.id == "sad") newMood = this.sad;
    if (event.srcElement.id == "okay") newMood = this.okay;
    newEntry.mood = newMood;
    newEntry.location = this.entry.location;
    newEntry.text = this.entry.text;
    console.log("Now I would save the entry: ", newEntry.mood);
    this.entryDataService.addEntry(newEntry);
    this.navCtrl.pop();
  }

}
