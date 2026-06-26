import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GanttModule, GanttAllModule } from '@syncfusion/ej2-angular-gantt';

import { App } from './app';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    GanttModule,
    GanttAllModule
  ],
  bootstrap: [App]
})
export class AppModule { }
