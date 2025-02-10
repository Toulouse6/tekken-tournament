import { Component, OnInit } from '@angular/core';
import { Character } from './models/character.model';
import { CharacterService } from './services/character.service';
import { CharacterSelectionComponent } from './components/character-selection/character-selection.component';
import { DisplayComponent } from './components/display/display.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CharacterSelectionComponent, DisplayComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    title = 'Tekken Tournament';

    fighter1: Character | null = null;
    fighter2: Character | null = null;
    arena: string | null = null;

    arenas: { name: string; image: string }[] = [];

    constructor(private characterService: CharacterService) { }

    ngOnInit(): void {
        // Intro sound
        if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
            const introSound = new Audio('./assets/audio/intro.mp3');
            introSound.play();
        }
        // Load arenas
        this.characterService.getArenas().subscribe((data) => {
            this.arenas = data;
        });
    }

    // On Select Changes
    onSelectionChange(selection: {
        fighter1: Character | null;
        fighter2: Character | null;
        arena: string | null;
    }) {
        this.fighter1 = selection.fighter1;
        this.fighter2 = selection.fighter2;
        this.arena = selection.arena;
    }


    // Get Arenas
    getArenasImage(): string {
        const selectedArena = this.arenas.find((s) => s.name === this.arena);


        return selectedArena ? selectedArena.image : './assets/images/arenas/default-arena-bg.png'; // Fallback image
    }

    // Arenas position
    getBackgroundPosition(): string {
        return this.arena ? 'center bottom' : 'center';
    }



}
