export interface Character {
    Id: number;
    ShortName: string;
    LongName: string;
    FightingStyle: string;
    Nationality: string;
    Height: number;
    Weight: number;
    Gender: string;
    Images: {
      Headshot: string;
      FullBody: string;
      Background: string;
    };
  }
  