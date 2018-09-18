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
    MatSliderModule,
    MatMenuModule,
    MatExpansionModule,
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
import {DishModalComponent} from './modals/dish-modal/dish-modal.component';
import {UploadcareUploaderComponent} from './components/uploadcare-uploader/uploadcare-uploader.component';
import {ImagesGalleryComponent} from './components/images-gallery/images-gallery.component';
import {ImageSizePipe} from './pipes/image-size.pipe';
import {LanguageSwitcherComponent} from './components/language-switcher/language-switcher.component';
import {ProviderSwitcherComponent} from './components/provider-switcher/provider-switcher.component';
import {OrdersListComponent} from './components/orders-list/orders-list.component';
import {FilterOrdersPipe} from './pipes/filter-orders.pipe';
import {OrdersAmountPipe} from './pipes/orders-amount.pipe';
import {CategoryNamePipe} from './pipes/category-name.pipe';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { HasRolePipe } from './pipes/has-role.pipe';

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
        MatMenuModule,
        MatExpansionModule,
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
        MatMenuModule,
        MatExpansionModule,
        FilterByFieldPipe,
        SortByFieldPipe,
        FilterOrdersPipe,
        OrdersAmountPipe,
        CategoryNamePipe,
        HasRolePipe,
        TranslationFilterPipe,
        UploadcareUploaderComponent,
        ImagesGalleryComponent,
        LanguageSwitcherComponent,
        ProviderSwitcherComponent,
        OrdersListComponent,
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
        LanguageSwitcherComponent,
        ImageSizePipe,
        ProviderSwitcherComponent,
        OrdersListComponent,
        FilterOrdersPipe,
        OrdersAmountPipe,
        CategoryNamePipe,
        UserModalComponent,
        HasRolePipe
    ],
    entryComponents: [
        ConfirmationComponent,
        CopyMenuComponent,
        DishModalComponent,
        UserModalComponent
    ]
})
export class ReusableModule {
}
