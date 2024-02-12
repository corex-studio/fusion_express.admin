import { BaseModelApi } from 'src/corexModels/apiModels/baseModelApi';
import { UserRaw, User } from './user';

export class UserApi extends BaseModelApi<User> {
  routeName = 'users';
  fromJson = (json: UserRaw) => new User(json);
}

export const userApi = new UserApi();
