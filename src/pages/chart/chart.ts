import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { EntryDetailPage } from '../entry-detail/entry-detail';
import { Entry } from '../../models/entry';
import { HomePage } from '../home/home';


const PLACEHOLDER_IMAGE: string = "/assets/imgs/holder.png";
const HAPPY_IMAGE: string = "/assets/imgs/Happy.png";
const ANGRY_IMAGE: string = "/assets/imgs/Angry.png";
const SAD_IMAGE: string = "/assets/imgs/Sad.png";
const OKAY_IMAGE: string = "/assets/imgs/Okay.png";

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})

export class ChartPage {

 
  @ViewChild('barChart') barChart;


  public entries: any={
    "entries":
   [
    {
      timestamp: new Date(),
      location: "Cafe",
      mood_image: HAPPY_IMAGE,
      mood_score: 100,
      color: "#FFCC00",
      hover: "#fff176",
      text: "I can't wait for Halloween! I'm going to eat so much candy!!!"
    },
    {
      timestamp: new Date(),
      location: "Home",
      mood_image: ANGRY_IMAGE,
      mood_score: -10,
      color: "#DB4437",
      hover: "#ff7762",
      text: "OMG Project 1 was the absolute suck!"
    },
    {
      timestamp: new Date(),
      location: "Library",
      mood_image: SAD_IMAGE,
      mood_score: -20,
      color: "#039BE5",
      hover: "#63ccff",
      text: "OMG Project 1 was the absolute suck!"
    },
    {
      timestamp: new Date(),
      location: "North Quad",
      mood_image: OKAY_IMAGE,
      mood_score: 50,
      color: "#4AAE4E",
      hover: "#7ee17c",
      text: "Today I went to my favorite class, SI 669. It was super great."
    }
    
  ]
};

  
 public barChartEl: any;
 public chartLabels: any = [];
 public chartValues: any = [];
 public chartColours: any = [];
 public chartHoverColours: any = [];
 public chartLoadingEl: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad()
  {
     this.defineChartData();
     this.createBarChart();
   //   setTimeout(() => {
   //      console.log("")
   //      this.createBarChart();
   //   }, 0)
  }

/**
    * Parse the JSON data, push specific keys into selected arrays for use with
    * each chart
    */
   defineChartData() : void
   {
      let k : any;

      for(k in this.entries.entries)
      {
         var entry = this.entries.entries[k];

         this.chartLabels.push(entry.location);
         this.chartValues.push(entry.mood_score);
         this.chartColours.push(entry.color);
         this.chartHoverColours.push(entry.hover);
      }
   }


   /**
    * Configure the Bar chart, define configuration options
    */
   createBarChart() : void
   {
      console.log("start...")
    this.barChartEl= new Chart(this.barChart.nativeElement,
      {
         type: 'horizontalBar',
         data: {
            labels: this.chartLabels,
            datasets: [{
               label: 'Mood vs. Location',
               data: this.chartValues,
               duration: 2000,
               easing: 'easeInQuart',
               backgroundColor: this.chartColours,
               hoverBackgroundColor: this.chartHoverColours
            }]
         },
         options : {
            maintainAspectRatio: false,
            legend         : {
               display     : true,
               boxWidth    : 80,
               fontSize    : 15,
               padding     : 0
            },
            scales: {
               yAxes: [{
                  ticks: {
                     beginAtZero:true,
                     stepSize: 20,
                     max : 100
                  }
               }],
               xAxes: [{
                  ticks: {
                     autoSkip: true
                  }
               }]
            }
         }
      });
      console.log("safe!")
    
   }



}
