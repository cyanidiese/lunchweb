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
    MatTableModule,
    MatTreeModule
} from '@angular/material';

import {Md2Module, NoConflictStyleCompatibilityMode} from 'md2';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UploadcareUploaderComponent} from './components/uploadcare-uploader/uploadcare-uploader.component';
import {ImagesGalleryComponent} from './components/images-gallery/images-gallery.component';
import {LanguageSwitcherComponent} from './components/language-switcher/language-switcher.component';
import {ProviderSwitcherComponent} from './components/provider-switcher/provider-switcher.component';
import {OrdersListComponent} from './components/orders-list/orders-list.component';
import {OrdersStatsComponent} from './components/orders-stats/orders-stats.component';
import {CategoriesTableComponent} from './components/categories-table/categories-table.component';
import {CommentsButtonComponent} from './components/comments-button/comments-button.component';
import {ConfirmationComponent} from './modals/confirmation/confirmation.component';
import {CopyMenuComponent} from './modals/copy-menu/copy-menu.component';
import {DishModalComponent} from './modals/dish-modal/dish-modal.component';
import {UserModalComponent} from './modals/user-modal/user-modal.component';
import {CategoryModalComponent} from './modals/category-modal/category-modal.component';
import {CommentsModalComponent} from './modals/comments-modal/comments-modal.component';

import {FilterOrdersPipe} from './pipes/filter-orders.pipe';
import {OrdersAmountPipe} from './pipes/orders-amount.pipe';
import {OrdersCaloriesPipe} from './pipes/orders-calories.pipe';
import {OrdersWeightPipe} from './pipes/orders-weight.pipe';
import {CategoryNamePipe} from './pipes/category-name.pipe';
import {HasRolePipe} from './pipes/has-role.pipe';
import {FilterByFieldPipe} from './pipes/filter-by-field.pipe';
import {TranslationFilterPipe} from './pipes/translation-filter.pipe';
import {FirstDishImagePipe} from './pipes/first-dish-image.pipe';
import {FormatDateStringPipe} from './pipes/format-date-string.pipe';
import {SortByFieldPipe} from './pipes/sort-by-field.pipe';
import {ImageSizePipe} from './pipes/image-size.pipe';
import {FilterCategoriesPipe} from './pipes/filter-categories.pipe';

import {ModalsService} from './modals/modals.service';

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
        MatTableModule,
        MatTreeModule,
        MatButtonToggleModule,
        FormsModule,
        ReactiveFormsModule,
        Md2Module,
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
        MatTableModule,
        MatTreeModule,
        FilterByFieldPipe,
        SortByFieldPipe,
        FilterCategoriesPipe,
        FilterOrdersPipe,
        OrdersAmountPipe,
        OrdersCaloriesPipe,
        OrdersWeightPipe,
        CategoryNamePipe,
        HasRolePipe,
        TranslationFilterPipe,
        UploadcareUploaderComponent,
        CategoriesTableComponent,
        ImagesGalleryComponent,
        LanguageSwitcherComponent,
        ProviderSwitcherComponent,
        OrdersListComponent,
        CommentsButtonComponent,
        FirstDishImagePipe,
        FormatDateStringPipe,
        FormsModule,
        ReactiveFormsModule,
        Md2Module,
        NoConflictStyleCompatibilityMode
    ],
    providers: [
        ModalsService,
        FilterCategoriesPipe
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
        HasRolePipe,
        OrdersStatsComponent,
        OrdersCaloriesPipe,
        OrdersWeightPipe,
        CategoriesTableComponent,
        CategoryModalComponent,
        FilterCategoriesPipe,
        CommentsModalComponent,
        CommentsButtonComponent
    ],
    entryComponents: [
        ConfirmationComponent,
        CopyMenuComponent,
        DishModalComponent,
        UserModalComponent,
        CategoryModalComponent,
        CommentsModalComponent
    ]
})
export class ReusableModule {
}
