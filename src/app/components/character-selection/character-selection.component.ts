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
    arena: string | null = null;

    activeArenaIndex: number = 0;

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
}