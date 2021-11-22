import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit, OnChanges {

    @Input() className: string = "";

    @Input() currentFaze: any;

    @Output() onValid: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit(): void { }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges && simpleChanges['className']) {
            this.isValid();
        }
    }

    isValid() {
        setTimeout(() => {
            let groundEls = Array.from(document.getElementsByClassName('ground'));
            let playerEls = Array.from(document.getElementsByClassName('player'));

            for (let [index, player] of playerEls.entries()) {
                let ground = groundEls[index];
                let groundRect = ground?.getBoundingClientRect();
                let playerRect = player?.getBoundingClientRect();

                if (groundRect && playerRect && player.children[0].className === ground.children[0].className && groundRect.top === playerRect.top && groundRect.left === playerRect.left) {
                    if (index === playerEls.length - 1) {
                        this.onValid.emit(true);
                    }
                }
                else {
                    this.onValid.emit(false);
                }
            }

        }, 50);
    }
}
