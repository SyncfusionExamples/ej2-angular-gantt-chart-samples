import { Component, OnInit, signal } from '@angular/core';
import { TaskFieldsModel } from '@syncfusion/ej2-angular-gantt';
import { DataManager, WebMethodAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  public data: DataManager | Object[] = [];

  public taskSettings: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Dependency',
    parentID: 'ParentID'
  };
  public editSettings: object = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    allowTaskbarEditing: true
  };

  public toolbar: string[] = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
  ngOnInit(): void {
    this.data = new DataManager({
      url: "https://localhost:7252/api/Gantt", // Here xxxx represents the port number.
      adaptor: new WebMethodAdaptor(),
      crossDomain: true
    });
  }
}
