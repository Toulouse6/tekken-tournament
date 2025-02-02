import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../models/character.model';
import charactersData from '../../assets/characters.json';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    private arenas = [
        { name: "Crystal Palace", image: './assets/images/arenas/crystal-palace.png' },
        { name: "Olympus", image: './assets/images/arenas/olympus.png' },
        { name: "Paradise", image: './assets/images/arenas/paradise.png' },
        { name: "Snow Sanctuary", image: './assets/images/arenas/snow-sanctuary.png' },
        { name: "Street of Carnage", image: './assets/images/arenas/street-of-carnage.png' },
        { name: "Street Walk", image: './assets/images/arenas/street-walk.png' },
        { name: "The Farm", image: './assets/images/arenas/the-farm.png' },
    ];

    getCharacters(): Observable<Character[]> {
        return of(charactersData as Character[]);
    }

    getArenas(): Observable<{ name: string; image: string }[]> {
        return of(this.arenas);
    }

    emitSelection(
        fighter1: Character | null,
        fighter2: Character | null,
        arena: string | null,
        eventEmitter: EventEmitter<any>
    ): void {
        eventEmitter.emit({ fighter1, fighter2, arena });
    }

    updateArena(arenas: { name: string; image: string }[], index: number, callback: (arena: string | null) => void): void {
        const selectedArena = arenas[index];
        callback(selectedArena ? selectedArena.name : null);
    }

    getNextArenaIndex(currentIndex: number, length: number): number {
        return (currentIndex + 1) % length;
    }

    getPreviousArenaIndex(currentIndex: number, length: number): number {
        return (currentIndex - 1 + length) % length;
    }

    toggleFighterSelection(
        character: Character,
        fighter1: Character | null,
        fighter2: Character | null
    ): { fighter1: Character | null; fighter2: Character | null } {
        if (fighter1 === character) return { fighter1: null, fighter2 };
        if (fighter2 === character) return { fighter1, fighter2: null };
        if (!fighter1) return { fighter1: character, fighter2 };
        if (!fighter2) return { fighter1, fighter2: character };
        return { fighter1, fighter2 };
    }

    isDisabled(character: Character, fighter1: Character | null, fighter2: Character | null): boolean {
        return fighter1 !== null && fighter2 !== null && character !== fighter1 && character !== fighter2;
    }

    startFight(fighter1: Character, fighter2: Character, resetCallback: () => void): void {
        console.log(`${fighter1.name} is fighting ${fighter2.name}!`);
    
        // Get display element
        const displayElement = document.querySelector('.display') as HTMLElement;
        if (displayElement) {
            displayElement.classList.add('fight-active');
        }
    
        // Reset fight after timeout
        setTimeout(() => {
            if (displayElement) {
                displayElement.classList.remove('fight-active');
            }
            resetCallback();
        }, 6000);
    }
    
}
