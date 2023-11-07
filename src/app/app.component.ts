import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diary-frontend';
  id: number;

  constructor() {
    this.id = -1;
    // localStorage.setItem("utestId", Number(-5).toString())
    this.id = Number(localStorage.getItem("userId"));
  }

}
