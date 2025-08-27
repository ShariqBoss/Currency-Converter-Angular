import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { ConversionHistoryItem } from '../../models/currency.model';

@Component({
  selector: 'app-conversion-history',
  templateUrl: './conversion-history.component.html',
  styleUrls: ['./conversion-history.component.scss']
})
export class ConversionHistoryComponent implements OnInit {
  history: ConversionHistoryItem[] = [];
  loading = false;
  error: string | null = null;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.loading = true;
    this.error = null;
    
    this.currencyService.getConversionHistory().subscribe({
      next: (history) => {
        this.history = history;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load conversion history. Please try again later.';
        this.loading = false;
        console.error('Error loading history:', error);
      }
    });
  }

  refreshHistory(): void {
    this.loadHistory();
  }

  clearHistory(): void {
    if (confirm('Are you sure you want to clear all conversion history?')) {
      this.history = [];
    }
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}