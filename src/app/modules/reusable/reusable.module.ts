import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    MatBadgeModule,
    MatTabsModule
} from '@angular/material';

import {Md2Module, NoConflictStyleCompatibilityMode} from 'md2';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ConfirmationComponent} from './modals/confirmation/confirmation.component';
import {CopyMenuComponent} from './modals/copy-menu/copy-menu.component';

import {ModalsService} from './modals/modals.service';
import {FilterByFieldPipe} from './pipes/filter-by-field.pipe';
import {TranslationFilterPipe} from './pipes/translation-filter.pipe';
import {FirstDishImagePipe} from './pipes/first-dish-image.pipe';
import {FormatDateStringPipe} from './pipes/format-date-string.pipe';
import {SortByFieldPipe} from './pipes/sort-by-field.pipe';
import { DishModalComponent } from './modals/dish-modal/dish-modal.component';

import { UcWidgetComponent } from 'ngx-uploadcare-widget';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatGridListModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatListModule,
        MatSnackBarModule,
        MatSelectModule,
        MatCardModule,
        MatBadgeModule,
        MatTabsModule,
        MatButtonToggleModule,
        FormsModule,
        ReactiveFormsModule,
        Md2Module,
        UcWidgetComponent,
        NoConflictStyleCompatibilityMode
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatGridListModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatListModule,
        MatSnackBarModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatCardModule,
        MatBadgeModule,
        MatTabsModule,
        FilterByFieldPipe,
        SortByFieldPipe,
        TranslationFilterPipe,
        FirstDishImagePipe,
        FormatDateStringPipe,
        FormsModule,
        ReactiveFormsModule,
        Md2Module,
        UcWidgetComponent,
        NoConflictStyleCompatibilityMode
    ],
    providers: [
        ModalsService
    ],
    declarations: [
        ConfirmationComponent,
        FilterByFieldPipe,
        SortByFieldPipe,
        TranslationFilterPipe,
        FirstDishImagePipe,
        FormatDateStringPipe,
        CopyMenuComponent,
        DishModalComponent
    ],
    entryComponents: [
        ConfirmationComponent,
        CopyMenuComponent,
        DishModalComponent
    ]
})
export class ReusableModule {
}
