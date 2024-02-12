import { ConceptionRaw, Conception } from './conception';
import { BaseModelApi } from 'src/corexModels/apiModels/baseModelApi';

export class ConceptionApi extends BaseModelApi<Conception> {
  routeName = 'conceptions'
  fromJson = (json: ConceptionRaw) => new Conception(json)
}

export const conceptionApi = new ConceptionApi();
