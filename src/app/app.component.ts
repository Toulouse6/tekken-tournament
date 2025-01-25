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
  title = 'tekken-fighters';

  fighter1: Character | null = null;
  fighter2: Character | null = null;
  arena: string | null = null;

  arenas: { name: string; image: string }[] = [];
  arenasNames: string[] = []; // Add this property

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    // Load arenas and populate arenasNames
    this.characterService.getArenas().subscribe((data) => {
      this.arenas = data;
      this.arenasNames = this.arenas.map((arena) => arena.name); // Extract arenas names
    });
  }

  onSelectionChange(selection: {
    fighter1: Character | null;
    fighter2: Character | null;
    arena: string | null;
  }) {
    this.fighter1 = selection.fighter1;
    this.fighter2 = selection.fighter2;
    this.arena = selection.arena;
  }

  getArenasImage(): string | null {
    const selectedArena = this.arenas.find((s) => s.name === this.arena);
    return selectedArena ? selectedArena.image : ''; // Default fallback
  }
  
}
