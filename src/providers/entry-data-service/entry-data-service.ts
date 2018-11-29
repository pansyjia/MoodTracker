import { Injectable } from '@angular/core';
import { Entry } from '../../models/entry';
import { Mood } from '../../models/mood';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC9ICYAY0GONi1mgiGgRjAAuaev2qqosvM",
  authDomain: "mood-tracker-8f5b8.firebaseapp.com",
  databaseURL: "https://mood-tracker-8f5b8.firebaseio.com",
  projectId: "mood-tracker-8f5b8",
  storageBucket: "mood-tracker-8f5b8.appspot.com",
  messagingSenderId: "1047636349755"
};

@Injectable()
export class EntryDataServiceProvider {
  private entries: Entry[] = [];
  private serviceObserver: Observer<Entry[]>;
  private clientObservable: Observable<Entry[]>;
  private db: any;

  constructor() {
    firebase.initializeApp(config);
    this.db = firebase.database();
    this.clientObservable = Observable.create(observer => {
      this.serviceObserver = observer;
    });

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
    };
      this.entries.push(entry);

    });
    this.notifySubscribers();
  });
  }

    public getObservable(): Observable<Entry[]> {
      return this.clientObservable;
    }

    private notifySubscribers(): void {
      this.serviceObserver.next(undefined);
    }

    public getEntries():Entry[] {
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
      let parentRef = this.db.ref('/entries');
      let childRef = parentRef.child(key);
      let updateRecord = {
        // id: newEntry.id,
        location: newEntry.location,
        mood: newEntry.mood,
        text: newEntry.text,
        timestamp: new Date(newEntry.timestamp).toLocaleString()
      }
      childRef.set(updateRecord);
      this.notifySubscribers();
    }

    public removeEntry(key): void {
      let parentRef = this.db.ref('/entries');
      let childRef = parentRef.child(key);
      childRef.remove();
      this.notifySubscribers();
    }


}
