export class Entry {
  id: number;
  timestamp: Date;
  location: string;
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
  public constructor(public id: string,
                     public name: number,
                     public lat: string,
                     public lng: string,
                     public countAll: string,
                     public googleMapId: number) {
  }
}
