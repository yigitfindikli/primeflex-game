import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

    createStorage(length: number) {
        let emptyFazes = new Array(length).fill('');
        let gameStorage = {
            'fazes': emptyFazes,
            'currentFaze': 0
        };

        localStorage.setItem('flex-game-deneme', JSON.stringify(gameStorage));
    }

    getStorage() {
        let storage = localStorage.getItem('flex-game-deneme');

        return storage ? JSON.parse(storage) : null;
    }

    updateStorage(storage: any) {
        localStorage.setItem('flex-game-deneme', JSON.stringify(storage));
    }
}
