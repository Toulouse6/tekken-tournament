export type FighterLevel = "Legendary" | "Tekken Lord" | "Ultimate Fighter" | "Elite";

export interface Character {
    id: number;
    name: string;
    level: FighterLevel; 
    fightingStyle: string;
    nationality: string;
    bornIn: any;
    images: {
      fullBody: string;
      background: string;
      headshot: string;
    };
}
