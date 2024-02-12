import { Conception } from './conception';
import { conceptionApi } from './conceptionApi';
import { reactive } from 'vue';
import BaseRepo from 'src/corexModels/apiModels/baseRepo';

export class ConceptionRepo extends BaseRepo<Conception> {
  api = conceptionApi;
}

export const conceptionRepo = reactive(new ConceptionRepo());
