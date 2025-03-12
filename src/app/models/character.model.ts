export type FighterLevel = "Titan" | "Tekken Lord" | "Supreme" | "Elite";

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
