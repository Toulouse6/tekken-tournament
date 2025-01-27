import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class DisplayComponent {
    @Input() fighter1: Character | null = null;
    @Input() fighter2: Character | null = null;
    @Input() backgroundImage: string | null = null;
    @Input() backgroundPosition: string = 'center bottom';
    isSliding: boolean = false;

    triggerSlide(): void {
        this.isSliding = true;

        // Reset the sliding effect after a brief period
        setTimeout(() => {
            this.isSliding = false;
        }, 500);  // Match the duration of the CSS transition
    }
}
