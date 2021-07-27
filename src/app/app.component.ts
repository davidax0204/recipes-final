import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedFeture = 'recipe';

  onNavigate(feture: string) {
    this.loadedFeture = feture;
  }
}
