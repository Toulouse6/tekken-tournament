import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../models/character.model';
import charactersData from '../../assets/characters.json';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    private arenas = [
        { name: 'Arena 1', image: './assets/images/arena-1.png' },
        { name: 'Arena 2', image: './assets/images/arena-2.png' },
        { name: 'Arena 3', image: './assets/images/arena-3.png' },
    ];

    // Return characters from the imported JSON
    getCharacters(): Observable<Character[]> {
        return of(charactersData as Character[]);
    }

    // Return mock Arenas
    getArenas(): Observable<{ name: string; image: string }[]> {
        return of(this.arenas);
    }


}
