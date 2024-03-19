import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatSliderModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ]
})

export class DemoMaterialModule {

}