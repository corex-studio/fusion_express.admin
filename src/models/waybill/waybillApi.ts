import { WaybillRaw, Waybill } from './waybill';
import { BaseModelApi } from 'src/corexModels/apiModels/baseModelApi';

export class WaybillApi extends BaseModelApi<Waybill> {
  routeName = 'waybills'
  fromJson = (json: WaybillRaw) => new Waybill(json)
}

export const waybillApi = new WaybillApi();
