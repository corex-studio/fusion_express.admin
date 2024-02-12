import moment from 'moment';
import { BaseModel } from 'src/corexModels/apiModels/baseModel';

export type ConceptionRaw = {
  uuid?: string | null;
  name?: string | null;
  external_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  account?: string | null;
  bank_1?: string | null;
  bank_2?: string | null;
  bik?: string | null;
  check_account?: string | null;
  corr_account?: string | null;
  inn?: string | null;
  kpp?: string | null;
  legal_name?: string | null;
  is_configured?: boolean;
};

export class Conception implements BaseModel {
  id: string | undefined;
  name: string | null;
  externalId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  account: string | null;
  bank1: string | null;
  bank2: string | null;
  bik: string | null;
  checkAccount: string | null;
  corrAccount: string | null;
  inn: string | null;
  kpp: string | null;
  legalName: string | null;
  isConfigured: boolean;
  constructor(raw: ConceptionRaw) {
    this.id = raw.uuid || undefined;
    this.name = raw.name || null;
    this.externalId = raw.external_id || null;
    this.createdAt = raw.created_at
      ? moment.utc(raw.created_at).local().format('DD.MM.YYYY HH:mm')
      : null;
    this.updatedAt = raw.updated_at
      ? moment.utc(raw.updated_at).local().format('DD.MM.YYYY HH:mm')
      : null;

    this.account = raw.account || null;
    this.bank1 = raw.bank_1 || null;
    this.bank2 = raw.bank_2 || null;
    this.bik = raw.bik || null;
    this.checkAccount = raw.check_account || null;
    this.corrAccount = raw.corr_account || null;
    this.inn = raw.inn || null;
    this.kpp = raw.kpp || null;
    this.legalName = raw.legal_name || null;
    this.isConfigured = raw.is_configured || false;
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      account: this.account,
      bank_1: this.bank1,
      bank_2: this.bank2,
      bik: this.bik,
      check_account: this.checkAccount,
      corr_account: this.corrAccount,
      inn: this.inn,
      kpp: this.kpp,
      legal_name: this.legalName,
      external_id: this.externalId,
      name: this.name,
    };
  }
}
