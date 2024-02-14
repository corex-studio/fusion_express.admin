import {
  conceptionRepo,
  ConceptionRepo,
} from 'src/models/conception/conceptionRepo';
import { boot } from 'quasar/wrappers';
import { waybillRepo, WaybillRepo } from 'src/models/waybill/waybillRepo';
import {
  warehouseRepo,
  WarehouseRepo,
} from 'src/models/warehouse/warehouseRepo';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $conception: ConceptionRepo;
    $waybill: WaybillRepo;
    $warehouse: WarehouseRepo;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$conception = conceptionRepo;
  app.config.globalProperties.$waybill = waybillRepo;
  app.config.globalProperties.$warehouse = warehouseRepo;
});
