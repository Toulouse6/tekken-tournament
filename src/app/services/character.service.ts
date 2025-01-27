import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../models/character.model';
import charactersData from '../../assets/characters.json';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    private arenas = [
        { name: "Budah's Nest", image: './assets/images/arenas/budah-nest.png' },
        { name: 'Garden of Fate', image: './assets/images/arenas/garden.png'},        
        { name: 'Cyber Zone', image: './assets/images/arenas/cyber-zone.png' },
        { name: "The Dragon Palace", image: './assets/images/arenas/elegant-palace.png' },
        { name: 'Tree of Life', image: './assets/images/arenas/tree-of-life.png' },
        { name: 'Temple of Emerald', image: './assets/images/arenas/temple.png' },

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
