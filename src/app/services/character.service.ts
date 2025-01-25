import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../models/character.model';
import charactersData from '../../assets/characters.json';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private arenas = [
    { name: 'arena 1', image: './assets/images/stage-1.png' },
    { name: 'arena 2', image: './assets/images/stage-2.png' },
    { name: 'arena 3', image: './assets/images/stage-3.png' },
  ];

  // Return characters from the imported JSON
  getCharacters(): Observable<Character[]> {
    return of(charactersData as Character[]);
  }

  // Return mock arenas
  getArenas(): Observable<{ name: string; image: string }[]> {
    return of(this.arenas);
  }

  
}
