import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { Character } from './models/character.model';
import { CharacterService } from './services/character.service';
import { CharacterSelectionComponent } from './components/character-selection/character-selection.component';
import { DisplayComponent } from './components/display/display.component';
import { isPlatformBrowser } from '@angular/common';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CharacterSelectionComponent, DisplayComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.updateOrientation();
    }

    title = 'Tekken Tournament';

    fighter1: Character | null = null;
    fighter2: Character | null = null;
    arena: string | null = null;

    arenas: { name: string; image: string }[] = [];

    constructor(private characterService: CharacterService, @Inject(PLATFORM_ID) private platformId: object) { }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.lockOrientation();
            this.updateOrientation();

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
    }

    updateOrientation() {
        if (isPlatformBrowser(this.platformId)) {
            const isLandscape = window.innerWidth > window.innerHeight;
            
            if (isLandscape) {
                document.body.classList.add('landscape-mode');
                console.log('Landscape mode enabled');
            } else {
                document.body.classList.remove('landscape-mode');
            }
        }
    }    

    async lockOrientation() {
        if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
            const screen = (window as any).screen;
            const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

            if (orientation && orientation.lock) {
                try {
                    // Request fullscreen before locking orientation
                    if (document.fullscreenEnabled) {
                        await document.documentElement.requestFullscreen();
                    }
                    await orientation.lock('landscape');
                    console.log('Orientation locked to landscape');
                } catch (error) {
                    console.warn('Screen orientation lock not supported:', error);
                }
            }
        } else {
            console.warn('Screen orientation not available in this environment.');
        }
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
