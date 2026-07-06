import { ODataV4Adaptor, DataManager, Query,  } from '@syncfusion/ej2-data';

export class CustomAdaptor extends ODataV4Adaptor {
  
  public override processResponse(): object {
    const original = super.processResponse.apply(this, arguments as any);
    /* Process response from server */
    return original;
  }
  public override processQuery(dm: DataManager, query: Query): Object {
    dm.dataSource.url = 'https://localhost:7239/odata/GanttTasks';
    const result = super.processQuery.apply(this, arguments as any);
    return result;
  }
  public override beforeSend(dm: DataManager, request: Request, settings?: any) {
    const token = (window as any).token;
    if (token) {
      request.headers.set('Authorization', `Bearer ${(window as any).token}`);
    }
    super.beforeSend(dm, request, settings);
  }
}
