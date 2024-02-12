import { BaseModelApi } from 'src/corexModels/apiModels/baseModelApi';
import { Authentication, AuthenticationRaw } from './auth';

export class AuthenticationApi extends BaseModelApi<Authentication> {
  routeName = 'users';
  fromJson = (json: AuthenticationRaw) => new Authentication(json);
}

export const authenticationApi = new AuthenticationApi();
