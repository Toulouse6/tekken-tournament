import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { Character } from '../models/character.model';
import charactersData from '../../assets/characters.json';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {

    // All Arenas
    private arenas = [
        { name: "Grim's Land", image: './assets/images/arenas/grims-land.png' },
        { name: "Cursed Dunes", image: './assets/images/arenas/cursed-dunes.png' },
        { name: "Silent Farm", image: './assets/images/arenas/silent-farm.png' },
        { name: "Moonlit Waters", image: './assets/images/arenas/moonlit-waters.png' },
        { name: "Mystic Plaza", image: './assets/images/arenas/mystic-plaza.png' },
        { name: "Crimson Field", image: './assets/images/arenas/crimson-field.png' },
        { name: "Wandering Streets", image: './assets/images/arenas/wandering-streets.png' },
        { name: "Winter Cabin", image: './assets/images/arenas/winter-cabin.png' },
    ];

    // Get Characters
    getCharacters(): Observable<Character[]> {
        return of(charactersData as Character[]);
    }

    // Get Arenas
    getArenas(): Observable<{ name: string; image: string }[]> {

        // Shuffle Arenas
        for (let i = this.arenas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.arenas[i], this.arenas[j]] = [this.arenas[j], this.arenas[i]];
        }
        return of(this.arenas);
    }

    // Toggle Fighter Selection
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

    // Toggle Disabled
    isDisabled(character: Character, fighter1: Character | null, fighter2: Character | null): boolean {
        return fighter1 !== null && fighter2 !== null && character !== fighter1 && character !== fighter2;
    }

    // Emit User Selection
    emitSelection(
        fighter1: Character | null,
        fighter2: Character | null,
        arena: string | null,
        eventEmitter: EventEmitter<any>
    ): void {
        eventEmitter.emit({ fighter1, fighter2, arena });
    }

    // Update Arena
    updateArena(arenas: { name: string; image: string }[], index: number, callback: (arena: string | null) => void): void {
        const selectedArena = arenas[index];
        callback(selectedArena ? selectedArena.name : null);
    }

    // Next Arena
    getNextArenaIndex(currentIndex: number, length: number): number {
        return (currentIndex + 1) % length;
    }

    // Previous Arena
    getPreviousArenaIndex(currentIndex: number, length: number): number {
        return (currentIndex - 1 + length) % length;
    }

    // Start Fight
    startFight(fighter1: Character, fighter2: Character, resetCallback: () => void): void {

        const displayElement = document.querySelector('.display') as HTMLElement;
        const fighter1Element = document.querySelector('.fighter1') as HTMLElement;
        const fighter2Element = document.querySelector('.fighter2') as HTMLElement;
        const winnerTextElement = document.querySelector('.winner-text h2') as HTMLElement;
        const gifElement = document.querySelector('.fight-gif') as HTMLElement;

        // Add 'fight-active' class
        if (displayElement) {
            displayElement.classList.add('fight-active');
        }

        setTimeout(() => {

            const winner = Math.random() < 0.5 ? fighter1 : fighter2;
            const loser = winner === fighter1 ? fighter2 : fighter1;
            const fightMusic = new Audio('./assets/audio/mountain-voices.mp3');
            const youLose = new Audio('./assets/audio/you-lose.mp3');
            const youWin = new Audio('./assets/audio/gong.mp3');

            // Show fight GIF
            if (gifElement) {
                gifElement.style.display = 'block';
                fightMusic.play();
            }

            // Hide GIF & show winner's name
            setTimeout(() => {
                if (gifElement) {
                    gifElement.style.display = 'none';
                    fightMusic.pause();
                }

                // Show winner text
                if (winnerTextElement) {
                    winnerTextElement.textContent = `${winner.name} wins`;
                    winnerTextElement.style.opacity = '1';
                    winnerTextElement.style.visibility = 'visible';
                }

                // Apply loser effect
                if (loser === fighter1 && fighter1Element) {
                    fighter1Element.style.filter = 'grayscale(85%)';
                    youLose.play();
                } else if (loser === fighter2 && fighter2Element) {
                    fighter2Element.style.filter = 'grayscale(85%)';
                    youWin.play();
                }

            }, 7500);

        }, 3500);

        setTimeout(() => {
            // Reset all effects
            if (fighter1Element) {
                fighter1Element.style.filter = ''; // Reset fighter1
            }
            if (fighter2Element) {
                fighter2Element.style.filter = ''; // Reset fighter2
            }

            // Clear the winner text
            if (winnerTextElement) {
                winnerTextElement.textContent = ''; // Reset winner
            }
            if (displayElement) {
                displayElement.classList.remove('fight-active');
            }
            resetCallback();

        }, 15000);  // Reset fight

    }
}
