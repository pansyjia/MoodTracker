import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { Entry } from '../../models/entry';
import { ChartPage } from '../chart/chart';


const PLACEHOLDER_IMAGE: string = "/assets/imgs/holder.png";
const HAPPY_IMAGE: string = "/assets/imgs/Happy-b.png";
const ANGRY_IMAGE: string = "/assets/imgs/Angry-b.png";
const SAD_IMAGE: string = "/assets/imgs/Sad-b.png";
const OKAY_IMAGE: string = "/assets/imgs/Okay-b.png";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  private entries: Entry[];  

  constructor(public navCtrl: NavController) {


    let fakeEntries: Entry[] = [
      {
        id:"1",
        timestamp: new Date(),
        location: "Cafe",
        mood_image: HAPPY_IMAGE,
        mood_score: 100,
        color: "#FFCC00",
        hover: "#fff176",
        text: "I can't wait for Halloween! I'm going to eat so much candy!!!"
      },
      {
        id:"2",
        timestamp: new Date(),
        location: "Home",
        mood_image: ANGRY_IMAGE,
        mood_score: 10,
        color: "#DB4437",
        hover: "ff7762",
        text: "OMG Project 1 was the absolute suck!"
      },
      {
        id:"3",
        timestamp: new Date(),
        location: "Library",
        mood_image: SAD_IMAGE,
        mood_score: 0,
        color: "039BE5",
        hover: "63ccff",
        text: "OMG Project 1 was the absolute suck!"
      },
      {
        id:"4",
        timestamp: new Date(),
        location: "North Quad",
        mood_image: OKAY_IMAGE,
        mood_score: 50,
        color: "#4AAE4E",
        hover: "#7ee17c",
        text: "Today I went to my favorite class, SI 669. It was super great."
      }
    ];
    
    this.entries = fakeEntries;
    
     
  }

 
  private editEntry(entryID: number) {
    // console.log("editing entry ", entryID);
    this.navCtrl.push(EntryDetailPage, {"entryID": entryID});
  }

}


