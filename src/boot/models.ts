import {
  conceptionRepo,
  ConceptionRepo,
} from 'src/models/conception/conceptionRepo';
import { boot } from 'quasar/wrappers';
import { waybillRepo, WaybillRepo } from 'src/models/waybill/waybillRepo';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $conception: ConceptionRepo;
    $waybill: WaybillRepo;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$conception = conceptionRepo;
  app.config.globalProperties.$waybill = waybillRepo;
});
