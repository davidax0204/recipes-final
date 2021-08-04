import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { DataStorageService } from 'src/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private DataStorageService: DataStorageService,
    private authServce: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authServce.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.DataStorageService.storeRecipes();
  }

  onFetchData() {
    this.DataStorageService.fetchRecipes().subscribe();
  }
}
