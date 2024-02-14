import { WarehouseRaw, Warehouse } from './warehouse';
import { BaseModelApi } from 'src/corexModels/apiModels/baseModelApi';

export class WarehouseApi extends BaseModelApi<Warehouse> {
  routeName = 'warehouses'
  fromJson = (json: WarehouseRaw) => new Warehouse(json)
}

export const warehouseApi = new WarehouseApi();
