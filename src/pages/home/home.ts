import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { Entry } from '../../models/entry';


const PLACEHOLDER_IMAGE: string = "/assets/imgs/holder.png";
const HAPPY_IMAGE: string = "/assets/imgs/Happy.png";
const ANGRY_IMAGE: string = "/assets/imgs/Angry.png";
const SAD_IMAGE: string = "/assets/imgs/Sad.png";
const OKAY_IMAGE: string = "/assets/imgs/Okay.png";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  ChartView = HomePage;
  AddEntry = EntryDetailPage;
  ListView = HomePage;

  private entries: any[] = [];
  alertCtrl: any;
  // private mood_image = PLACEHOLDER_IMAGE;
  

  constructor(public navCtrl: NavController) {


    let fakeEntries = [
      {
        timestamp: new Date(),
        location: "North Quad",
        mood_image: OKAY_IMAGE,
        mood_score: 50,
        text: "Today I went to my favorite class, SI 669. It was super great."
      },
      {
        timestamp: new Date(),
        location: "Cafe",
        mood_image: HAPPY_IMAGE,
        mood_score: 100,
        text: "I can't wait for Halloween! I'm going to eat so much candy!!!"
      },
      {
        timestamp: new Date(),
        location: "Home",
        mood_image: ANGRY_IMAGE,
        mood_score: 0,
        text: "OMG Project 1 was the absolute suck!"
      }
    ];
    this.entries = fakeEntries;

  }

 
  private addEntry() {
    this.navCtrl.push(EntryDetailPage);
  }

}


