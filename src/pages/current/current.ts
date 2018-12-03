import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';
import { NewMoodPage } from '../new-mood/new-mood';
import { Entry } from '../../models/entry';

@IonicPage()
@Component({
  selector: 'page-current',
  templateUrl: 'current.html',
})
export class CurrentPage {
  
  private entry: Entry;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private entryService: EntryDataServiceProvider) {

                this.entryService.getObservable().subscribe(
                  (update) => {
                      this.entry = this.entryService.getEntries()[0];
                      console.log(this.entry);
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
    this.navCtrl.push(NewMoodPage);
  }

  private getMood(name: string) {
    let thisMood = this.entryService.getMood(name)
    // console.log('thisMood', thisMood);
    return thisMood;
  }

  private checkStatus(){
    if(this.entryService.getEntries().length == 0){
        return true;
      }
      return false;
    }
    
}
