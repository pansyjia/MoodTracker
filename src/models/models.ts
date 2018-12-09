export class Entry {
  id: any;
  timestamp: Date;
  location: string;
  locationId: string;
  text: string;
  mood: any;
  // image: string;
}

export class Mood {
  public constructor(public type: string,
                     public score: number,
                     public image: string,
                     public color: string,
                     public hover: string) {

  }
}

export class Location {
  public constructor(public name: string = "Finding your location...",
                     public address: string = "A moment please...",
                     public lat: number = 999,
                     public lng: number = 999,
                     public countAll: number = 0,
                     public googleMapId: string = "fake",
                     public distanceToMe: number = 0) {
  }
}
