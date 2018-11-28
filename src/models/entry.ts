export class Entry {
  id: any;
  ////better use string not number for firebase purpose
  timestamp: Date;
  location: string;
  mood: string;
  //mood_image: string;
  text: string;

  //for drawing bar chart purpose, not sure if included in data model
  // mood_score: number;
  // hover: string;
  // color: string;

}
