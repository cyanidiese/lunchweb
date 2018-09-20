import {Component, Input, OnInit} from '@angular/core';
import {ModalsService} from '../../modals/modals.service';
import {StateService} from '../../../../services/state.service';

@Component({
    selector: 'lunch-comments-button',
    templateUrl: './comments-button.component.html',
    styleUrls: ['./comments-button.component.scss']
})
export class CommentsButtonComponent implements OnInit {

    @Input() dishId: number;
    @Input() itemId: number;
    @Input() replyToCommentId: number;

    constructor(private state: StateService,
                private modalsService: ModalsService) {
    }

    ngOnInit() {
    }

    showCommentsDialog() {
        this.modalsService.commentsDialog(this.dishId, this.itemId, this.replyToCommentId);
    }

}
