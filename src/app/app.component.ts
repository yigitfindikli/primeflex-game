import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { GameService } from './game.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    level: number = 0;

    className: string = '';

    isValid: boolean = false;

    gameList: any[] = [];

    constructor(private http: HttpClient, private gameService: GameService) {}

    ngOnInit(): void {
        this.http.get<any>('assets/game.json').pipe(first()).subscribe((x) => {
            this.gameList = x.data;
            let storage = this.gameService.getStorage();

            if (storage) {
                this.level = storage.currentFaze;
                this.className = storage.fazes[this.level];
            }
            else {
                this.gameService.createStorage(this.gameList.length);
            }
        });
    }

    onValidation(event: any) {
        if (event) {
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
    }

    onDropdownChange() {
        this.updateStorage(this.level);
    }

    onInput() {
        let storage = this.gameService.getStorage();
        storage.fazes[this.level] = this.className;
        this.gameService.updateStorage(storage);
    }

    onEnter() {
        if (this.isValid && this.level < this.gameList.length - 1) {
            this.nextFaze();
        }
    }

    nextFaze() {
        if (this.isValid) {
            this.next();
        }
    }

    next() {
        if (this.nextActive) {
            this.updateStorage(this.level + 1);
        }
    }

    prev() {
        if (this.prevActive) {
            this.updateStorage(this.level - 1);
        }
    }

    updateStorage(level: number) {
        let storage = this.gameService.getStorage();
        this.className = storage.fazes[level];
        this.level = level;
        storage.currentFaze = this.level;
        this.gameService.updateStorage(storage);
    }

    get prevActive() {
        return this.level > 0;
    }

    get nextActive() {
        return this.level < this.gameList.length - 1;
    }
}
