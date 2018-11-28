import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChartPage } from '../chart/chart';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  ChartView = ChartPage;
  AddEntry = EntryDetailPage;
  ListView = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
