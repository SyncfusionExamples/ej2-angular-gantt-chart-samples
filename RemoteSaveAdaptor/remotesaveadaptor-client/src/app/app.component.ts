import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttAllModule,CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public data: DataManager | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    fetch('https://localhost:7007/api/gantt') // replace 'https://localhost:7007' with your local host address
      .then(res => res.json())
      .then(result => {
        this.data = new DataManager({
          json: result,
          adaptor: new RemoteSaveAdaptor(),
          batchUrl: 'https://localhost:7007/api/gantt/Batch', //  replace 'https://localhost:7007' with your local host address
          enableOffline: true
        } as any);
        this.cdr.detectChanges();
      });
  }

  public taskFields: object = {
    id: 'taskId',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    parentID: 'parentId'
  };

  public editSettings: object = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    allowTaskbarEditing: true
  };

  public toolbar: string[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
}