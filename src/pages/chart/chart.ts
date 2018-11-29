import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Entry } from '../../models/entry';
import { Mood } from '../../models/mood';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service'

import { EntryDetailPage } from '../entry-detail/entry-detail';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})

export class ChartPage {


  private happy = new Mood("happy", 100, "/assets/imgs/Happy-b.png", "#FFCC00", "#fff176");
  private angry = new Mood("angry", -10, "/assets/imgs/Angry-b.png", "#DB4437", "#ff7762");
  private sad = new Mood("sad", -20, "/assets/imgs/Sad-b.png", "#039BE5", "#63ccff");
  private okay = new Mood("okay", 50, "/assets/imgs/Okay-b.png", "#4AAE4E", "#7ee17c");


 @ViewChild('barChart') barChart;


 private entries: Entry[];
 public barChartEl: any;
 public chartLabels: any = [];
 public chartValues: any = [];
 public chartColours: any = [];
 public chartHoverColours: any = [];
 public chartLoadingEl: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private entryService: EntryDataServiceProvider) {
    this.entryService.getObservable().subscribe(
      (update) => {
          this.entries = this.entryService.getEntries();
          console.log(this.entries);
      },
      (err) => {
        console.log('this.entryService.getObservable().subscribe :', err);
      });
    this.entries = this.entryService.getEntries();


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
      for(k in this.entries)
      {
         var entry = k;
         this.chartLabels.push(entry.location);
         this.chartValues.push(entry.mood.score);
         this.chartColours.push(entry.mood.color);
         this.chartHoverColours.push(entry.mood.hover);
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
               label: 'Mood Score',
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



// Question: 1. need to calculate avg mood score at the same place next step
