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
    MatListModule
} from '@angular/material';

import { ConfirmationComponent } from './modals/confirmation/confirmation.component';

import {ModalsService} from './modals/modals.service';
import { FilterByFieldPipe } from './pipes/filter-by-field.pipe';
import { TranslationFilterPipe } from './pipes/translation-filter.pipe';
import { FirstDishImagePipe } from './pipes/first-dish-image.pipe';

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
        MatListModule
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
        FilterByFieldPipe,
        TranslationFilterPipe,
        FirstDishImagePipe
    ],
    providers: [
        ModalsService
    ],
    declarations: [
        ConfirmationComponent,
        FilterByFieldPipe,
        TranslationFilterPipe,
        FirstDishImagePipe
    ],
    entryComponents: [
        ConfirmationComponent
    ]
})
export class ReusableModule {
}
