import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../../models/character.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class CharacterSelectionComponent implements OnInit {
  characters: Character[] = [];
  fighter1: Character | null = null;
  fighter2: Character | null = null;
  stage: string | null = null;

  @Output() selectionChange = new EventEmitter<{
    fighter1: Character | null;
    fighter2: Character | null;
    stage: string | null;
  }>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Character[]>('assets/characters.json').subscribe((data) => {
      this.characters = data;
    });
  }

  onSelectionChange(): void {
    this.selectionChange.emit({
      fighter1: this.fighter1,
      fighter2: this.fighter2,
      stage: this.stage,
    });
  }
}
