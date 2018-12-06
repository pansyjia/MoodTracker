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
  public constructor(public id: number,
                     public name: string,
                     public address: string,
                     public lat: number,
                     public lng: number,
                     public countAll: number,
                     public googleMapId: string) {
  }
}
