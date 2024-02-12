import { BaseAuthentication } from 'src/corexModels/authentication/baseAuthentication';
import { reactive } from 'vue';

export class Authentication extends BaseAuthentication {}
export const authentication = reactive(new Authentication());
