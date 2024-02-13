import { Conception } from './conception';
import { conceptionApi } from './conceptionApi';
import { reactive } from 'vue';
import BaseRepo from 'src/corexModels/apiModels/baseRepo';

export class ConceptionRepo extends BaseRepo<Conception> {
  api = conceptionApi;

  async loadConceptions() {
    return await this.api.send({
      method: 'POST',
      action: 'load',
    });
  }
}

export const conceptionRepo = reactive(new ConceptionRepo());
