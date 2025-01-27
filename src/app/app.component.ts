import { Component, OnInit } from '@angular/core';
import { Character } from './models/character.model';
import { CharacterService } from './services/character.service';
import { CharacterSelectionComponent } from './components/character-selection/character-selection.component';
import { DisplayComponent } from './components/display/display.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterSelectionComponent, DisplayComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tekken-fighters';

  fighter1: Character | null = null;
  fighter2: Character | null = null;
  arena: string | null = null;

  arenas: { name: string; image: string }[] = [];
  arenasNames: string[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    // Load arenas
    this.characterService.getArenas().subscribe((data) => {
      this.arenas = data; 
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

  getArenasImage(): string {
    const selectedArena = this.arenas.find((s) => s.name === this.arena);
    return selectedArena ? selectedArena.image : './assets/images/arenas/default-arena-bg.png'; // Fallback image
  }
}
