export class Entry {
  id: string; 
  ////better use string not number for firebase purpose
  timestamp: Date;
  location: string;
  mood_image: string;
  mood_score: number;
  color: string; 
  ///for drawing bar chart purpose, not sure if included in data model
  hover: string; 
  ///for drawing bar chart purpose, not sure if included in data model
  text: string;
}
