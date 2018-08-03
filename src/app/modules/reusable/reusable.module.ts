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
    MatTabsModule,
    MatSliderModule
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
import { UploadcareUploaderComponent } from './components/uploadcare-uploader/uploadcare-uploader.component';
import { ImagesGalleryComponent } from './components/images-gallery/images-gallery.component';
import { ImageSizePipe } from './pipes/image-size.pipe';

// import { UcWidgetComponent } from 'ngx-uploadcare-widget';


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
        MatSliderModule,
        MatButtonToggleModule,
        FormsModule,
        ReactiveFormsModule,
        Md2Module,
        // UcWidgetComponent,
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
        MatSliderModule,
        FilterByFieldPipe,
        SortByFieldPipe,
        TranslationFilterPipe,
        UploadcareUploaderComponent,
        ImagesGalleryComponent,
        FirstDishImagePipe,
        FormatDateStringPipe,
        FormsModule,
        ReactiveFormsModule,
        Md2Module,
        // UcWidgetComponent,
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
        DishModalComponent,
        UploadcareUploaderComponent,
        ImagesGalleryComponent,
        ImageSizePipe
    ],
    entryComponents: [
        ConfirmationComponent,
        CopyMenuComponent,
        DishModalComponent
    ]
})
export class ReusableModule {
}
