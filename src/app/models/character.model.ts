export interface Character {
    id: number;
    name: string;
    level: string;
    fightingStyle: string;
    nationality: string;
    bornIn: any;
    images: {
      fullBody: string;
      background: string;
      headshot: string;
    };
  }
  