import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'acheron-render';
  public version = 0;

  public updateVersion(element: any): void {
    console.log(element, 'element');
    this.version = element;
  }
}
