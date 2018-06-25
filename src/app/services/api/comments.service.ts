import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Comment} from '../../classes/models/comment';

@Injectable()
export class CommentsService {

    constructor(private api: ApiService) {
    }

    getComments() {
        return this.api.get('/comments/index');
    }

    saveComment(data: Comment) {
        return this.api.post('/comments/save', [], data);
    }

    deleteComment(commentId: number) {
        return this.api.delete('/comments/' + commentId + '/delete');
    }
}
