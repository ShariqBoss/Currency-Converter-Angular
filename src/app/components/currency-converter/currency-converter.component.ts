import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../models/currency.model';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencyForm: FormGroup;
  currencies: Currency[] = [];
  convertedAmount: number | null = null;
  conversionRate: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.currencyForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.loading = true;
    this.error = null;
    this.currencyService.getCurrencies().subscribe({
      next: (response) => {
        this.currencies = Object.keys(response.data).map(key => ({
          code: key,
          name: response.data[key].name,
          symbol: response.data[key].symbol
        }));
        if (this.currencies.length > 0) {
          this.currencyForm.patchValue({
            fromCurrency: 'USD',
            toCurrency: 'EUR'
          });
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load currencies. Please try again later.';
        this.loading = false;
        console.error('Error loading currencies:', error);
      }
    });
  }

  convertCurrency(): void {
    if (this.currencyForm.invalid) {
      return;
    }
    const { fromCurrency, toCurrency, amount } = this.currencyForm.value;
    this.loading = true;
    this.error = null;
    this.convertedAmount = null;
    this.conversionRate = null;
    this.currencyService.convertCurrency(fromCurrency, toCurrency, amount).subscribe({
      next: (response) => {
        this.convertedAmount = response.convertedAmount;
        this.conversionRate = response.rate;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to convert currency. Please try again later.';
        this.loading = false;
        console.error('Error converting currency:', error);
      }
    });
  }

  swapCurrencies(): void {
    const from = this.currencyForm.get('fromCurrency')?.value;
    const to = this.currencyForm.get('toCurrency')?.value;
    this.currencyForm.patchValue({
      fromCurrency: to,
      toCurrency: from
    });
    if (this.currencyForm.valid) {
      this.convertCurrency();
    }
  }
}