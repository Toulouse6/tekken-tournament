import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-character-selection',
    templateUrl: './character-selection.component.html',
    styleUrls: ['./character-selection.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule],
})

export class CharacterSelectionComponent implements OnInit {

    @Input() arenas: { name: string; image: string }[] = [];
    @Output() selectionChange = new EventEmitter<{
        fighter1: Character | null;
        fighter2: Character | null;
        arena: string | null;
    }>();

    characters: Character[] = [];
    fighter1: Character | null = null;
    fighter2: Character | null = null;
    arena: string | null = "";
    activeArenaIndex: number = 0;
    isFightActive: boolean = false;

    private fightStateSubscription?: Subscription;

    constructor(private characterService: CharacterService) {
        this.characterService.getArenas();
    }

    ngOnInit(): void {
        this.characterService.getCharacters().subscribe((data) => this.characters = data);
        this.characterService.getArenas().subscribe((data) => this.arenas = data);
    };

    // Character Selection
    onSelectionChange(): void {
        this.characterService.emitSelection(this.fighter1, this.fighter2, this.arena, this.selectionChange);
    }

    toggleFighterSelection(character: Character): void {
        const fighters = this.characterService.toggleFighterSelection(character, this.fighter1, this.fighter2);
        this.fighter1 = fighters.fighter1;
        this.fighter2 = fighters.fighter2;
        const selectSound = new Audio('./assets/audio/boom.mp3');

        selectSound.play();
        this.onSelectionChange();
    }

    ngOnDestroy(): void {
        this.fightStateSubscription?.unsubscribe();
    }


    isDisabled(character: Character): boolean {
        return this.characterService.isDisabled(character, this.fighter1, this.fighter2);
    }

    // Arena Selection
    updateArena(): void {
        this.characterService.updateArena(this.arenas, this.activeArenaIndex, (updatedArena) => {
            this.arena = updatedArena;
            this.onSelectionChange();
        });
    }

    nextArena(): void {
        this.activeArenaIndex = this.characterService.getNextArenaIndex(this.activeArenaIndex, this.arenas.length);
        this.updateArena();

        const nextSound = new Audio('./assets/audio/woosh.mp3');
        nextSound.play();
    }

    previousArena(): void {
        this.activeArenaIndex = this.characterService.getPreviousArenaIndex(this.activeArenaIndex, this.arenas.length);
        this.updateArena();

        const nextSound = new Audio('./assets/audio/woosh.mp3');
        nextSound.play();
    }

    // Fight
    startFight(fighter1: Character, fighter2: Character): void {

        // Play fight sound
        const fightSound = new Audio('./assets/audio/three-two-one.mp3');
        fightSound.play();

        // Fight Active
        const displayElement = document.querySelector('.display') as HTMLElement;
        if (displayElement) {
            displayElement.classList.add('fight-active');
        }

        if (this.fighter1 && this.fighter2) {
            this.isFightActive = true;
            this.characterService.startFight(this.fighter1, this.fighter2, () => this.onFightReset());
        }

        if (!this.isFightActive && fighter1 && fighter2) {
            try {
                this.characterService.startFight(fighter1, fighter2, () => this.onFightReset());
            } catch (error) {
                console.error('Error starting fight:', error);
                this.onFightReset();
            }
        }
    }

    private onFightReset(): void {
        // Reset selections
        this.fighter1 = null;
        this.fighter2 = null;
        this.arena = "";
        this.activeArenaIndex = 0;
        this.isFightActive = false;

        // Shuffle arenas
        this.characterService.getArenas().subscribe((shuffledArenas) => {
            this.arenas = shuffledArenas;
            this.onSelectionChange(); // Re-emit selection after shuffling
        });
    }


}