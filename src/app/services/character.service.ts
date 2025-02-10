import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { Character, FighterLevel } from '../models/character.model';
import charactersData from '../../assets/characters.json';

@Injectable({
    providedIn: 'root',
})

export class CharacterService {

    // All Arenas
    private arenas = [
        { name: "Silent Swamp", image: './assets/images/arenas/silent-swamp.png' },
        { name: "Grim's Land", image: './assets/images/arenas/grims-land.png' },
        { name: "Cursed Dunes", image: './assets/images/arenas/cursed-dunes.png' },
        { name: "Moonlit Waters", image: './assets/images/arenas/moonlit-waters.png' },
        { name: "Mystic Farm", image: './assets/images/arenas/mystic-farm.png' },
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
        const shuffledArenas = [...this.arenas];
        for (let i = shuffledArenas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArenas[i], shuffledArenas[j]] = [shuffledArenas[j], shuffledArenas[i]];
        }
        return of(shuffledArenas); // Return shuffled
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

    // Win chance based on levels
    getWinChance(level1: FighterLevel, level2: FighterLevel): number {
        const chances = {
            "Titan": {
                "Titan": 0.5,
                "Tekken Lord": 0.6,
                "Supreme": 0.8,
                "Elite": 0.9
            },
            "Tekken Lord": {
                "Titan": 0.4,
                "Tekken Lord": 0.5,
                "Supreme": 0.6,
                "Elite": 0.8
            },
            "Supreme": {
                "Titan": 0.2,
                "Tekken Lord": 0.4,
                "Supreme": 0.5,
                "Elite": 0.6
            },
            "Elite": {
                "Titan": 0.1,
                "Tekken Lord": 0.2,
                "Supreme": 0.4,
                "Elite": 0.5
            }
        };
    
        return chances[level1][level2];
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
            // Win chances
            const winChance = this.getWinChance(fighter1.level, fighter2.level);
            const winner = Math.random() < winChance ? fighter1 : fighter2;
            const loser = winner === fighter1 ? fighter2 : fighter1; 

            const fightMusic = new Audio('./assets/audio/samurai-lofium.mp3');
            const youLose = new Audio('./assets/audio/you-lose.mp3');
            const youWin = new Audio('./assets/audio/you-win.mp3');

            // Show fight GIF
            if (gifElement) {
                displayElement.classList.add('shine-active');
                gifElement.style.display = 'block';
                fightMusic.play();
            }

            // Hide GIF & show winner's name
            setTimeout(() => {
                if (gifElement) {
                    displayElement.classList.remove('shine-active');
                    gifElement.style.display = 'none';
                    fightMusic.pause();
                }

                // Show winner text
                if (winnerTextElement) {
                    winnerTextElement.textContent = `${winner.name} wins!`;
                    winnerTextElement.style.opacity = '1';
                    winnerTextElement.style.visibility = 'visible';

                    // Apply loser effect 
                    if (loser === fighter1 && fighter1Element) {

                        fighter1Element.style.transition = 'none'; // Disable transition
                        fighter1Element.classList.add('grayscale');

                        const winnerFighterBackground = winner === fighter1 ? (fighter1Element.querySelector('.fighter-background') as HTMLElement) : (fighter2Element.querySelector('.fighter-background') as HTMLElement);
                        if (winnerFighterBackground) {
                            const backgroundUrl = winnerFighterBackground.style.backgroundImage;
                            displayElement.style.setProperty('--winner-background', backgroundUrl);
                        }

                        youLose.play();

                        // Force a reflow
                        void fighter1Element.offsetWidth;
                        fighter1Element.style.transition = ''; // Re-enable transitions
                    } else if (loser === fighter2 && fighter2Element) {
                        fighter2Element.style.transition = 'none';
                        fighter2Element.classList.add('grayscale');

                        const winnerFighterBackground = winner === fighter2 ? (fighter2Element.querySelector('.fighter-background') as HTMLElement) : (fighter1Element.querySelector('.fighter-background') as HTMLElement);
                        if (winnerFighterBackground) {
                            const backgroundUrl = winnerFighterBackground.style.backgroundImage;
                            displayElement.style.setProperty('--winner-background', backgroundUrl);
                        }
                        youWin.play();

                        // Force a reflow
                        void fighter2Element.offsetWidth;

                        fighter2Element.style.transition = '';
                    }
                }

            }, 7500);

        }, 4000);

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
                displayElement.style.setProperty('--winner-background', '');
                displayElement.classList.remove('fight-active');
            }
            resetCallback();

        }, 16000);  // Reset fight

    }
}
