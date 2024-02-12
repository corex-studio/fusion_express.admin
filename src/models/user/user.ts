import { BaseModel } from 'src/corexModels/apiModels/baseModel';

export type UserRaw = {
  id: string | number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
};

export class User implements BaseModel {
  id: string | number | undefined;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;

  constructor(raw: UserRaw) {
    this.id = raw.id || undefined;
    this.username = raw.username;
    this.email = raw.email;
    this.firstName = raw.first_name;
    this.lastName = raw.last_name;
    this.phone = raw.phone;
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
    };
  }
}
