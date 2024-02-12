import BaseRepo from 'src/corexModels/apiModels/baseRepo';
import { BaseAuthenticationTokens } from 'src/corexModels/authentication/baseAuthenticationTokens';
import { reactive } from 'vue';
import { Authentication } from './auth';
import { authenticationApi } from './authApi';
import { authentication } from './authentication';

export class AuthenticationRepo extends BaseRepo<Authentication> {
  api = authenticationApi;

  async initialise(access?: string, refresh?: string) {
    if (access || refresh) {
      authentication.tokens = new BaseAuthenticationTokens(
        access || null,
        refresh || null
      );
      authentication.setApiHeader();
    }
    await authentication.validateTokens();
    // Object.assign(api.defaults.headers, {
    //   ['User-Role']: 'admin',
    // });
    await authentication.me();
  }
}

export const authRepo = reactive(new AuthenticationRepo());
