import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../models/character.model';
import charactersData from '../../assets/characters.json';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    private arenas = [
        { name: "Crystal Palace", image: './assets/images/arenas/crystal-palace.png' },
        { name: "Gym", image: './assets/images/arenas/gym.png' },
        { name: "Olympus", image: './assets/images/arenas/olympus.png' },
        { name: "Paradise", image: './assets/images/arenas/paradise.png' },
        { name: "Snow Sanctuary", image: './assets/images/arenas/snow-sanctuary.png' },
        { name: "Street of Carnage", image: './assets/images/arenas/street-of-carnage.png' },
        { name: "Street Walk", image: './assets/images/arenas/street-walk.png' },
        { name: "The Farm", image: './assets/images/arenas/the-farm.png' },
    ];

    // Return characters
    getCharacters(): Observable<Character[]> {
        return of(charactersData as Character[]);
    }

    // Return Arenas
    getArenas(): Observable<{ name: string; image: string }[]> {
        return of(this.arenas);
    }

}
