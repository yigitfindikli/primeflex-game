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
            let groundEl = document.getElementsByClassName('ground')[0]?.getBoundingClientRect();
            let playerEl = document.getElementsByClassName('player')[0]?.getBoundingClientRect();
            if (groundEl && playerEl) {
                if (groundEl.top === playerEl.top && groundEl.left === playerEl.left) {
                    this.onValid.emit(true)
                }
                else {
                    this.onValid.emit(false)
                }
            }
        }, 50);
    }
}
