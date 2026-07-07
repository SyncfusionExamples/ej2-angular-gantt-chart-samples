import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import {
  GanttComponent,
  PdfExportProperties,
  GanttAllModule, 
} from '@syncfusion/ej2-angular-gantt';
// import { virtualData } from './data';
import { CustomAdaptor } from './custom-adaptor';
import { DataManager } from '@syncfusion/ej2-data';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [GanttAllModule],
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App implements OnInit {
  @ViewChild('ganttDefault')
  public ganttObj?: GanttComponent
  public data?: DataManager;
  public taskFields: any;
  public resourceFields: any;
  public resources: any;
  public editSettings: any;
  public toolbar?: string[];
  public ngOnInit(): void {

    this.data = new DataManager({
      url: 'https://localhost:7239/odata/GanttTasks',
      adaptor: new CustomAdaptor(),
      key: 'TaskID',
      crossDomain: true
    });
  this.resourceFields = {
      id: 'resourceId',
      name: 'resourceName',
      unit: 'resourceUnit',
      group: 'resourceGroup'
    };

    this.resources = [
      { resourceId: 1, resourceName: 'Martin Tamer' },
      { resourceId: 2, resourceName: 'Rose Fuller' },
      { resourceId: 3, resourceName: 'Margaret Buchanan' },
      { resourceId: 4, resourceName: 'Fuller King' },
      { resourceId: 5, resourceName: 'Davolio Fuller' },
      { resourceId: 6, resourceName: 'Van Jack' },
      { resourceId: 7, resourceName: 'Fuller Buchanan' },
      { resourceId: 8, resourceName: 'Jack Davolio' },
      { resourceId: 9, resourceName: 'Tamer Vinet' },
      { resourceId: 10, resourceName: 'Vinet Fuller' },
      { resourceId: 11, resourceName: 'Bergs Anton' },
      { resourceId: 12, resourceName: 'Construction Supervisor' }
    ];

    this.taskFields = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Dependency',
      parentID: 'ParentID',
      segments: 'Segments',
      resourceInfo: 'ResourceInfos',
    };

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      allowTaskbarEditing: true
    };

    this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];   
}
}
