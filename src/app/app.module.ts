import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatOptionModule } from '@angular/material/core';
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { A11yModule } from '@angular/cdk/a11y';


import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ConversionHistoryComponent } from './components/conversion-history/conversion-history.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    ConversionHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    OverlayModule,
    MatOptionModule,
    ScrollingModule,
    A11yModule
  ],
  providers: [
    ScrollDispatcher,
    ViewportRuler
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }