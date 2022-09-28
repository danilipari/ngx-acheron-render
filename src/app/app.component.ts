import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'acheron-render';
  public version = 0;
  public widgetInputData: any = [
    { 'gallery': true },
    { 'profile': true },
  ];
  public widgetList: any = [];

  ngOnInit(): void {
    /*  */
  }

  public updateVersion(element: any): void {
    console.log(element, 'element');
    this.version = element;
  }

  public contentUpdate(data: any): void {
    console.log(data, 'contentUpdate');
    this.widgetList = data;
  }

  public componentInlude(element: string) {
    return this.widgetList.includes(element);
  }
}
