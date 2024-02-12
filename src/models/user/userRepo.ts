import { User } from './user';
import { userApi } from './userApi';
import { reactive } from 'vue';
import BaseRepo from 'src/corexModels/apiModels/baseRepo';

export class UserRepo extends BaseRepo<User> {
  api = userApi;
}

export const userRepo = reactive(new UserRepo());
