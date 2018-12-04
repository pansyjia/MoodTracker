import { Injectable } from '@angular/core';
import { Entry, Mood, Location } from '../../models/models';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
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
  private serviceObserver: Observer<any>;
  private clientObservable: Observable<any>;
  private db: any;

  constructor() {
    firebase.initializeApp(config);
    this.db = firebase.database();
    console.log('test service constructor');
    this.clientObservable = Observable.create(observer => {
      console.log('test this.clientObservable',  this.clientObservable);
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
    this.serviceObserver.next(true);
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

  public getMood(name: string):Mood {
    if (name == "happy") { return new Mood("happy", 100, "/assets/imgs/Happy-b.png", "#FFCC00", "#fff176"); }
    if (name == "angry") { return new Mood("angry", -10, "/assets/imgs/Angry-b.png", "#DB4437", "#ff7762"); }
    if (name == "sad") { return new Mood("sad", -20, "/assets/imgs/Sad-b.png", "#039BE5", "#63ccff"); }
    if (name == "okay") { return new Mood("okay", 50, "/assets/imgs/Okay-b.png", "#4AAE4E", "#7ee17c"); }
    return new Mood("happy", 100, "/assets/imgs/Happy-b.png", "#FFCC00", "#fff176"); // if not applied
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
    console.log('in service, the new entry is', dataRecord)
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
