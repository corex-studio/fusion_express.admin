import { Waybill, WaybillSchedule } from './waybill';
import BaseRepo from 'src/corexModels/apiModels/baseRepo';
import { waybillApi } from './waybillApi';
import { reactive } from 'vue';

export class WaybillRepo extends BaseRepo<Waybill> {
  api = waybillApi;

  async getSchedule(interval?: number): Promise<WaybillSchedule> {
    return await this.api.send({
      method: 'GET',
      action: 'schedule',
      data: {
        interval,
      },
    });
  }

  async setSchedule(data: WaybillSchedule | null): Promise<WaybillSchedule> {
    return await this.api.send({
      method: 'POST',
      action: 'set_schedule',
      data: data || {},
    });
  }

  async process(data: Record<string, any>) {
    return await this.api.send({
      method: 'POST',
      action: 'process',
      data: data || {},
    });
  }
}

export const waybillRepo = reactive(new WaybillRepo());
