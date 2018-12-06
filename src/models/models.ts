export class Entry {
  id: number;
  timestamp: Date;
  location: string;
  locationId: number;
  text: string;
  mood: any;
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
  public constructor(public id: number = -1,
                     public name: string = "Finding...",
                     public address: string = "",
                     public lat: number = 0,
                     public lng: number = 0,
                     public countAll: number = 0,
                     public googleMapId: string = "",
                     public distanceToMe: number = 0) {
  }
}
