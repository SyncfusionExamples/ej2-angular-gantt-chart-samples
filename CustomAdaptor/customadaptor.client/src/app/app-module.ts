import { NgModule } from '@angular/core';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';

// This project uses a standalone component for App.
// Keep NgModule minimal so it doesn't conflict with standalone bootstrap.
@NgModule({
  imports: [GanttAllModule],
})
export class AppModule {}