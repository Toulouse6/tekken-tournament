export interface Character {
    Id: number;
    ShortName: string;
    LongName: string;
    FightingStyle: string;
    Nationality: string;
    Height: number;
    Weight: number;
    Images: {
      FullBody: string;
      Background: string;
      Headshot: string;
    };
  }
  