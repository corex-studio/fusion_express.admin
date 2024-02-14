import moment from 'moment';
import { BaseModel } from 'src/corexModels/apiModels/baseModel';

export type WarehouseRaw = {
  uuid?: string | null;
  name?: string | null;
  active?: boolean;
  external_id?: string | null;
  created_at?: string | null;
};

export class Warehouse implements BaseModel {
  id: string | undefined;
  name: string | null;
  active: boolean;
  externalId: string | null;
  createdAt: string | null;

  constructor(raw: WarehouseRaw) {
    this.id = raw.uuid || undefined;
    this.name = raw.name || null;
    this.active = raw.active || false;
    this.externalId = raw.external_id || null;
    this.createdAt = raw.created_at
      ? moment.utc(raw.created_at).local().format('DD.MM.YYYY HH:mm')
      : null;
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      active: this.active,
      external_id: this.externalId,
      name: this.name,
    };
  }
}
