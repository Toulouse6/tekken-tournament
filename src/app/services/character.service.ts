import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../models/character.model';
import charactersData from '../../assets/characters.json';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    private arenas = [
        { name: "Steet View", image: './assets/images/arenas/street-view.png' },
        { name: 'Green Fields', image: './assets/images/arenas/green-fields.png' },
        { name: 'The Farm', image: './assets/images/arenas/farm.png' },
        { name: 'Olympus', image: './assets/images/arenas/olympus.png' },
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
