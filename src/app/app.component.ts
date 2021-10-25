import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<any>('assets/game.json').subscribe((x) => {
            this.gameList = x.data;
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

    onEnter() {
        if (this.isValid && this.level < this.gameList.length - 1) {
            this.nextFaze();
        }
    }

    nextFaze() {
        if (this.isValid) {
            if (this.level < this.gameList.length - 1) {
                this.className = '';
                this.level++;
            }
            else {
                console.log('Well Done');
            }
        }
    }
}
