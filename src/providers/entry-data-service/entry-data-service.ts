import { Injectable } from '@angular/core';
import { Entry } from '../../models/models';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC9ICYAY0GONi1mgiGgRjAAuaev2qqosvM",
  authDomain: "mood-tracker-8f5b8.firebaseapp.com",
  databaseURL: "https://mood-tracker-8f5b8.firebaseio.com",
  projectId: "mood-tracker-8f5b8",
  storageBucket: "mood-tracker-8f5b8.appspot.com",
  messagingSenderId: "1047636349755"
};

///firebase for testing empty state
// const config = {
//   apiKey: "AIzaSyBU4FhZ_0XJF9-GpUxvRCfXFP14PnANb6o",
//   authDomain: "moodtracker-b75bd.firebaseapp.com",
//   databaseURL: "https://moodtracker-b75bd.firebaseio.com",
//   projectId: "moodtracker-b75bd",
//   storageBucket: "moodtracker-b75bd.appspot.com",
//   messagingSenderId: "587504295484"
// };


@Injectable()
export class EntryDataServiceProvider {
  private entries: Entry[] = [];
  ////replace Observer with Subject
  private serviceObserver: Subject<any>;
  private clientObservable: Subject<any>;
  private db: any;

  constructor() {
    firebase.initializeApp(config);
    this.db = firebase.database();

  //   this.clientObservable = Observable.create(observer => {
  //   this.serviceObserver = observer;
  // });

    this.clientObservable = new Subject();
    this.serviceObserver = this.clientObservable;

    let dataRef = this.db.ref('/entries');
    dataRef.on('value', snapshot => {
        this.entries = [];
        snapshot.forEach(childSnapshot => {
          let entry = {
            id: childSnapshot.key,
            location: childSnapshot.val().location,
            timestamp: childSnapshot.val().timestamp,
            text: childSnapshot.val().text,
            mood: childSnapshot.val().mood,
            locationId: childSnapshot.val().locationId,
          };
      this.entries.push(entry);

    });
    this.notifySubscribers();
  });
  }

    public getObservable(): Subject<Entry[]> {
      return this.clientObservable;
    }

    private notifySubscribers(): void {
      // this.serviceObserver.next(true);
      this.serviceObserver.next(undefined);
      ///Siyu can only run the file using undefined
    }

    public getEntries(): Entry[]{
      let entriesClone = JSON.parse(JSON.stringify(this.entries));
      return entriesClone.sort(function(a, b) {
        if (a.timestamp > b.timestamp) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    public getEntryByID(id: any): Entry {
      for (let e of this.entries) {
        if (e.id === id) {
          let clone = JSON.parse(JSON.stringify(e));
          return clone;
        }
      }
      return undefined;
    }

    public addEntry(entry: Entry): void {
      let listEntry = this.db.ref('/entries');
      let entryRef = listEntry.push();
      let dataRecord = {
        location: entry.location,
        mood: entry.mood,
        text: entry.text,
        timestamp: new Date().toLocaleString()
      }
      entryRef.set(dataRecord);
     
      this.notifySubscribers();
    }

    public updateEntry(key, newEntry: Entry): void {
      let parentRef = this.db.ref('/entries' + newEntry.id);
      let updateRecord = {
        location: newEntry.location,
        mood: newEntry.mood,
        text: newEntry.text,
        timestamp: new Date(newEntry.timestamp).toLocaleString()
      }
      parentRef.set(updateRecord);
      this.notifySubscribers();
    }

    public removeEntry(key): void {
      let parentRef = this.db.ref('/entries');
      let childRef = parentRef.child(key);
      childRef.remove();
      this.notifySubscribers();
    }

    public moodCount(type: string): number{
      let moodcount = 0;
      for (let e of this.entries) {
        if (e.mood.type === type) {
          moodcount +=1;
        }
      }
      return moodcount;
    }




}
