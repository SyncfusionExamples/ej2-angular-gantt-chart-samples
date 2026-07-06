import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(GanttModule)]
});