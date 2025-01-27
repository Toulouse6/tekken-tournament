import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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


    constructor(private characterService: CharacterService) { }

    ngOnInit(): void {
        this.characterService.getCharacters().subscribe((data) => {
            this.characters = data;
        });
    }

    onSelectionChange(): void {
        this.selectionChange.emit({
            fighter1: this.fighter1,
            fighter2: this.fighter2,
            arena: this.arena,
        });
    }

updateArena(): void {
    const selectedArena = this.arenas[this.activeArenaIndex];
    this.arena = selectedArena ? selectedArena.name : null;

    // Emit selection change event
    this.selectionChange.emit({
        fighter1: this.fighter1,
        fighter2: this.fighter2,
        arena: this.arena,
    });
}

nextArena(): void {
    if (this.arenas.length > 0) {
        this.activeArenaIndex = (this.activeArenaIndex + 1) % this.arenas.length; // Loop to the beginning
        this.updateArena();
    }
}

previousArena(): void {
    if (this.arenas.length > 0) {
        this.activeArenaIndex =
            (this.activeArenaIndex - 1 + this.arenas.length) % this.arenas.length; // Loop to the end
        this.updateArena();
    }
}
    
    toggleFighterSelection(character: Character): void {
        if (this.fighter1 === character) {
            this.fighter1 = null;
        } else if (this.fighter2 === character) {
            this.fighter2 = null;
        } else if (!this.fighter1) {
            this.fighter1 = character;
        } else if (!this.fighter2) {
            this.fighter2 = character;
        }
        this.onSelectionChange(); // Emit changes
    }
    

    isDisabled(character: Character): boolean {
        return (
            this.fighter1 !== null &&
            this.fighter2 !== null &&
            character !== this.fighter1 &&
            character !== this.fighter2
        );
    }

    startFight(): void {
        if (this.fighter1 && this.fighter2) {
            console.log(`${this.fighter1.LongName} is fighting ${this.fighter2.LongName}!`);

            // Activate fight state
            const displayElement = document.querySelector('.display') as HTMLElement;
            if (displayElement) {
                displayElement.classList.add('fight-active');
            }

            // Optionally disable UI
            this.isFightActive = true;

            // Reset fight
            setTimeout(() => {
                this.resetFight();
            }, 6000);
        }
    }

    resetFight(): void {
        // Reload & reset all states
        window.location.reload();
    }


}