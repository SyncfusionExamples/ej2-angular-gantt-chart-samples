import { Component } from '@angular/core';
import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';

class GraphQLCrudAdaptor extends GraphQLAdaptor {
  override processResponse(resData: any, ds?: any, query?: any, xhr?: any, request?: any) {

    if (resData && resData.data) {
      const data = resData.data;

      if (data.getTasks) {
        return data.getTasks;
      }

      if (data.updateTask) {
        return { result: data.updateTask };
      }

      if (data.addTask) {
        return { result: data.addTask };
      }

      if (data.deleteTask !== undefined) {
        return { result: data.deleteTask };
      }

      if (data.batchTasks) {
        return data.batchTasks;
      }
    }

    return super.processResponse(resData, ds, query, xhr, request);
  }
}


@Component({
  selector: 'app-root',
  template: `
    
<div style="margin:20px">
  <ejs-gantt [dataSource]="dataManager"
             [taskFields]="taskSettings"
             [editSettings]="editSettings"
             [toolbar]="toolbar"
             [enableContextMenu]="true"
             height="400px">
    <e-columns>
      <e-column field="TaskID" headerText="Task ID" textAlign="Right" width="90" type="number" isPrimaryKey="true"></e-column>
      <e-column field="TaskName" headerText="Task Name" textAlign="Left" width="270" type="string"></e-column>
      <e-column field="StartDate" headerText="Start Date" textAlign="Right" width="150" format="yMd" type="dateTime"></e-column>
      <e-column field="EndDate" headerText="End Date" textAlign="Right" width="150" format="dd/MM/yyyy hh:mm" type="dateTime"></e-column>
      <e-column field="Duration" headerText="Duration" textAlign="Right" width="90" type="number"></e-column>
      <e-column field="Progress" headerText="Progress" textAlign="Right" width="120" type="number"></e-column>
    </e-columns>
  </ejs-gantt>
</div>

  `,
  imports: [GanttAllModule]
})
export class AppComponent {

  public taskSettings = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId',
    segments: 'Segments',
    resourceInfo: 'ResourceInfos'
  };

  public resources: Object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer' },
    { resourceId: 2, resourceName: 'Rose Fuller' },
    { resourceId: 3, resourceName: 'Margaret Buchanan' }
  ];

  public resourceFields = {
    id: 'resourceId',
    name: 'resourceName',
    unit: 'resourceUnit',
    group: 'resourceGroup'
  };

  public editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };

  public toolbar: string[] = [
    'Add', 'Edit', 'Update', 'Delete', 'Cancel',
    'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'
  ];

  // ✅ DataManager with GraphQL
  public dataManager: DataManager = new DataManager({
    url: 'http://localhost:4205/', 
    adaptor: new GraphQLCrudAdaptor({

      response: {
        result: 'getTasks.result',
        count: 'getTasks.count'
      },

      query: `
        query getTasks {
          getTasks {
            count
            result {
              TaskID
              TaskName
              StartDate
              EndDate
              Duration
              Progress
              ParentId
              Predecessor
              Segments {
                StartDate
                EndDate
                Duration
              }
              ResourceInfos {
                resourceId
                resourceName
                resourceGroup
                resourceUnit
              }
            }
          }
        }
      `,

      mutation: {
        update: 'updateTask',
        insert: 'addTask',
        remove: 'deleteTask'
      },

      getMutation: (action: string) => {

        if (action === 'insert') {
          return `
            mutation AddTask($value: GanttTaskInput!) {
              addTask(value: $value) {
                TaskID
                TaskName
                StartDate
                EndDate
                Duration
                Progress
                ParentId
                Predecessor
              }
            }
          `;
        }

        if (action === 'update') {
          return `
            mutation UpdateTask($value: GanttTaskInput!) {
              updateTask(value: $value) {
                TaskID
                TaskName
                StartDate
                EndDate
                Duration
                Progress
                ParentId
                Predecessor
              }
            }
          `;
        }

        if (action === 'remove') {
          return `
            mutation DeleteTask($key: ID!) {
              deleteTask(key: $key)
            }
          `;
        }

        return '';
      }

    }as any),
    crossDomain: true
  } );

}