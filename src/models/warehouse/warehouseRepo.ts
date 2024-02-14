import { Warehouse } from './warehouse';
import BaseRepo from 'src/corexModels/apiModels/baseRepo';
import { warehouseApi } from './warehouseApi';
import { reactive } from 'vue';

export class WarehouseRepo extends BaseRepo<Warehouse> {
  api = warehouseApi;

  async loadWarehouses() {
    return await this.api.send({
      method: 'POST',
      action: 'load',
    });
  }
}

export const warehouseRepo = reactive(new WarehouseRepo());
