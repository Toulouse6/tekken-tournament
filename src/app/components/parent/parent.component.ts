import { Component } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharacterSelectionComponent } from '../character-selection/character-selection.component';
import { DisplayComponent } from '../display/display.component';

@Component({
    selector: 'app-parent', // This must match the tag in index.html
    templateUrl: './parent.component.html',
    styleUrls: ['./parent.component.css'],
    standalone: true,
    imports: [CharacterSelectionComponent, DisplayComponent],
})

export class ParentComponent {
    fighter1: Character | null = null;
    fighter2: Character | null = null;
    stage: string | null = null;

    stages = ['Stage 1', 'Stage 2', 'Stage 3'];

    // Handle selections from the child component
    onSelectionChange(selection: {
        fighter1: Character | null;
        fighter2: Character | null;
        stage: string | null;
    }) {
        this.fighter1 = selection.fighter1;
        this.fighter2 = selection.fighter2;
        this.stage = selection.stage;
    }
}
