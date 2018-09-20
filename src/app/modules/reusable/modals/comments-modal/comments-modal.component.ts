import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Inject, Injectable, Output} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CategoriesService} from '../../../../services/api/categories.service';
import {FilterCategoriesPipe} from '../../pipes/filter-categories.pipe';

/**
 * Json node data with nested structure. Each node has a Commentname and a value or a list of children
 */
export class CommentNode {
    children: CommentNode[];
    Commentname: string;
    type: any;
}

/**
 * The Json tree data in string. The data could be parsed into Json object
 */
const TREE_DATA = JSON.stringify({
    Applications: {
        Calendar: 'app',
        Chrome: 'app',
        Webstorm: 'app'
    },
    Documents: {
        angular: {
            src: {
                compiler: 'ts',
                core: 'ts'
            }
        },
        material2: {
            src: {
                button: 'ts',
                checkbox: 'ts',
                input: 'ts'
            }
        }
    },
    Downloads: {
        October: 'pdf',
        November: 'pdf',
        Tutorial: 'html'
    },
    Pictures: {
        'Photo Booth Library': {
            Contents: 'dir',
            Pictures: 'dir'
        },
        Sun: 'png',
        Woods: 'jpg'
    }
});

/**
 * Comment database, it can build a tree structured Json object from string.
 * Each node in Json object represents a Comment or a directory. For a Comment, it has Commentname and type.
 * For a directory, it has Commentname and children (a list of Comments or directories).
 * The input will be a json object string, and the output is a list of `CommentNode` with nested
 * structure.
 */
@Injectable()
export class CommentDatabase {
    dataChange = new BehaviorSubject<CommentNode[]>([]);

    get data(): CommentNode[] {
        return this.dataChange.value;
    }

    constructor() {
        this.initialize();
    }

    initialize() {
        // Parse the string to json object.
        const dataObject = JSON.parse(TREE_DATA);

        // Build the tree nodes from Json object. The result is a list of `CommentNode` with nested
        //     Comment node as children.
        const data = this.buildCommentTree(dataObject, 0);

        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the Comment structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `CommentNode`.
     */
    buildCommentTree(obj: object, level: number): CommentNode[] {
        return Object.keys(obj).reduce<CommentNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new CommentNode();
            node.Commentname = key;

            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildCommentTree(value, level + 1);
                } else {
                    node.type = value;
                }
            }

            return accumulator.concat(node);
        }, []);
    }
}

/**
 * @title Tree with nested nodes
 */
@Component({
    selector: 'lunch-comments-modal',
    templateUrl: './comments-modal.component.html',
    styleUrls: ['./comments-modal.component.scss'],
    providers: [CommentDatabase]
})
export class CommentsModalComponent {

    @Output() error : EventEmitter<any> = new EventEmitter();
    @Output() updated : EventEmitter<any> = new EventEmitter();

    nestedTreeControl: NestedTreeControl<CommentNode>;
    nestedDataSource: MatTreeNestedDataSource<CommentNode>;

    constructor(private database: CommentDatabase,
                private fb: FormBuilder,
                private dialogRef: MatDialogRef<CommentsModalComponent>,
                private categoryApi: CategoriesService,
                private snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) data) {
        this.nestedTreeControl = new NestedTreeControl<CommentNode>(this._getChildren);
        this.nestedDataSource = new MatTreeNestedDataSource();

        database.dataChange.subscribe(data => this.nestedDataSource.data = data);
    }

    hasNestedChild = (_: number, nodeData: CommentNode) => !nodeData.type;

    private _getChildren = (node: CommentNode) => node.children;
}