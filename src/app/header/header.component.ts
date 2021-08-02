import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private DataStorageService: DataStorageService) {}

  ngOnInit(): void {}

  onSaveData() {
    this.DataStorageService.storeRecipes();
  }

  onFetchData() {
    this.DataStorageService.fetchRecipes().subscribe();
  }
}
