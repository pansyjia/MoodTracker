import { Injectable } from '@angular/core';
import { Entry, Mood } from '../../models/models';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import firebase from 'firebase';
// import { UsersserviceProvider } from "../usersservice/usersservice";
import { Storage } from "@ionic/storage";


@Injectable()
export class EntryDataServiceProvider {
  private entries: Entry[] = [];
  private serviceObserver: Subject<any>;
  private clientObservable: Subject<any>;
  private db: any;
  private username: string;
  private uid: string;
  private dataRef: any;

  constructor( private storage: Storage) {
    // this.usersService.getObservable().subscribe(
    //   (update) => {
    //     this.username = this.usersService.getProfileName();
    //     this.uid = this.usersService.getProfileUID();
    //   },
    //   (err) => {
    //     console.log('this.usersService.getObservable:', err);
    //   });
    // this.username = this.usersService.getProfileName();
    // this.uid = this.usersService.getProfileUID();
    this.storage.get('user-email').then((val) => {
      this.username = val;
    });
    this.storage.get('user-uid').then((val) => {
      this.uid = val;
    });

    this.db = firebase.database();

    this.dataRef = this.db.ref('/' + this.uid + '/entries');

    this.clientObservable = new Subject();
    this.serviceObserver = this.clientObservable;

    this.storage.get('user-email').then((val) => {
      this.updateCache();
    });
  //
  //   dataRef.on('value', snapshot => {
  //       this.entries = [];
  //       snapshot.forEach(childSnapshot => {
  //         let entry = {
  //           id: childSnapshot.key,
  //           location: childSnapshot.val().location,
  //           timestamp: childSnapshot.val().timestamp,
  //           text: childSnapshot.val().text,
  //           mood: childSnapshot.val().mood,
  //           // image: childSnapshot.val().image,
  //           locationId: childSnapshot.val().locationId,
  //         };
  //     this.entries.push(entry);
  //
  //   });
  //   this.notifySubscribers();
  // });
  }

  public updateCache() {

    this.dataRef.off("value");
    this.entries = [];
    this.storage.get('user-email').then((val) => {
      this.username = val;
    });
    this.storage.get('user-uid').then((val) => {
      this.uid = val;
    });
    console.log(this.username, this.uid);
    this.dataRef = this.db.ref('/' + this.uid + '/entries');
    this.dataRef.on('value', snapshot => {
      this.entries = [];
      snapshot.forEach(childSnapshot => {
        let entry = {
          id: childSnapshot.key,
          location: childSnapshot.val().location,
          timestamp: childSnapshot.val().timestamp,
          text: childSnapshot.val().text,
          mood: childSnapshot.val().mood,
          // image: childSnapshot.val().image,
          locationId: childSnapshot.val().locationId,
        };
        this.entries.push(entry);
      });
      this.notifySubscribers();
    });
    // this.notifySubscribers();
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
      console.log('addEntry', '/' + this.uid + '/entries');
      let listEntry = this.db.ref('/' + this.uid + '/entries');
      let entryRef = listEntry.push();
      let dataRecord = {
        id: -1,
        location: entry.location,
        locationId: entry.locationId,
        mood: entry.mood,
        // image: entry.mood.image,
        text: entry.text,
        timestamp: new Date().toLocaleString()
      }
      entryRef.set(dataRecord);
      // this.entries.push(entry);
      this.notifySubscribers();
    }

    public updateEntry(key, newEntry: Entry): void {
      let parentRef = this.db.ref('/' + this.uid + '/entries');
      let childRef = parentRef.child(key);
      let updateRecord = {
        // id: newEntry.id,
        location: newEntry.location,
        locationId: newEntry.locationId,
        mood: newEntry.mood,
        // image: newEntry.mood.image,
        text: newEntry.text,
        timestamp: new Date(newEntry.timestamp).toLocaleString()
      }
      childRef .set(updateRecord);
      this.notifySubscribers();
    }

    public removeEntry(key): void {
      let parentRef = this.db.ref('/' + this.uid + '/entries');
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


    public getMood(name: string):Mood {
      if (name == "happy") { return new Mood("happy", 100, "/assets/imgs/happy.png", "#F0CF75", "#FFE7A3"); }
      if (name == "angry") { return new Mood("angry", 30, "/assets/imgs/angry.png", "#E6646E", "#E6888D"); }
      if (name == "sad") { return new Mood("sad", 50, "/assets/imgs/sad.png", "#6DBEFF", "#B7DDFF"); }
      if (name == "okay") { return new Mood("okay", 80, "/assets/imgs/okay.png", "#F09C4F", "#F0B077"); }
      return new Mood("happy", 100, "/assets/imgs/happy.png", "#F0CF75", "#FFE7A3"); // if not applied
    }

}
