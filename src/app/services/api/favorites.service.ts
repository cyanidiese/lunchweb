import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {SimpleId} from '../../classes/structs/simple-id';

@Injectable()
export class FavoritesService {

    constructor(private api: ApiService) {
    }

    getFavorites() {
        return this.api.get('/master/favorites');
    }

    toggleFavorite(favorite: SimpleId) {
        return this.api.post('/master/favorites/toggle', [], favorite);
    }

    addFavorite(favorite: SimpleId) {
        return this.api.post('/master/favorites/add', [], favorite);
    }

    removeFavorite(favorite: SimpleId) {
        return this.api.delete('/master/favorites/remove', [], favorite);
    }
}
