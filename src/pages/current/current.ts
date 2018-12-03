import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';
import { NewMoodPage } from '../new-mood/new-mood';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { Entry } from '../../models/entry';
import { Mood } from '../../models/mood';

@IonicPage()
@Component({
  selector: 'page-current',
  templateUrl: 'current.html',
})
export class CurrentPage {
  private entries: Entry[];
  private entry: Entry;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private entryService: EntryDataServiceProvider) {

        this.entryService.getObservable().subscribe(
          (update) => {
              this.entries = this.entryService.getEntries();
              this.entry = this.entries[0];

          },
          (err) => {
            console.log('this.entryService.getObservable()[0].subscribe :', err);
          });
        this.entry = this.entryService.getEntries()[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentPage');
  }


  private addNew (){
    this.navCtrl.push(EntryDetailPage);
  }

  // private getMood(name: string) {
  //   let thisMood = this.entryService.getMood(name);
  //   return thisMood;
  // }

  private checkStatus(){
    if(this.entryService.getEntries().length == 0){
        return true;
      }
      return false;
    }

}
