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

    saveFavorite(favorite: SimpleId) {
        return this.api.post('/master/favorites/save', [], favorite);
    }

    deleteFavorite(favorite: SimpleId) {
        return this.api.delete('/master/favorites/delete', [], favorite);
    }
}
