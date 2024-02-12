import moment from 'moment';
import { BaseModel } from 'src/corexModels/apiModels/baseModel';

export enum ScheduleType {
  DAY = 'day',
  MINUTE = 'minute',
  HOUR = 'hour',
}

export const scheduleTypeNames = {
  [ScheduleType.DAY]: 'В днях',
  [ScheduleType.MINUTE]: 'В минутах',
  [ScheduleType.HOUR]: 'В часах',
};

export const scheduleTypes = Object.keys(scheduleTypeNames).map((el) => {
  const key = el as ScheduleType;
  return {
    label: scheduleTypeNames[key] as ScheduleType,
    value: key,
  };
});

export type WaybillSchedule = {
  uuid: string | null;
  type: ScheduleType;
  last_send: string | null;
  next_send: string | null;
  interval: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export enum WaybillType {
  CREATED = 'created',
  IN_PROGRESS = 'in_progress',
  PROCESSED = 'processed',
  FAILED = 'failed',
}

export const waybillTypeNames = {
  [WaybillType.CREATED]: {
    label: 'Создана',
    color: 'blue',
  },
  [WaybillType.IN_PROGRESS]: {
    label: 'В процессе',
    color: 'orange',
  },
  [WaybillType.PROCESSED]: {
    label: 'Обработана',
    color: 'success',
  },
  [WaybillType.FAILED]: {
    label: 'Ошибка',
    color: 'danger',
  },
};

export const waybillTypes = Object.keys(waybillTypeNames).map((el) => {
  const key = el as WaybillType;
  return {
    label: waybillTypeNames[key].label as WaybillType,
    value: key,
  };
});

export type WaybillRaw = {
  uuid?: string | null;
  number?: string | null;
  document_date?: string | null;
  status?: WaybillType;
  created_at?: string | null;
  updated_at?: string | null;
};

export class Waybill implements BaseModel {
  id: string | undefined;
  number: string | null;
  documentDate: string | null;
  status: WaybillType;
  createdAt: string | null;
  updatedAt: string | null;
  constructor(raw: WaybillRaw) {
    this.id = raw.uuid || undefined;
    this.number = raw.number || null;
    this.documentDate = raw.document_date
      ? moment.utc(raw.document_date).local().format('DD.MM.YYYY HH:mm')
      : null;
    this.status = raw.status || WaybillType.CREATED;
    this.createdAt = raw.created_at
      ? moment.utc(raw.created_at).local().format('DD.MM.YYYY HH:mm')
      : null;
    this.updatedAt = raw.updated_at
      ? moment.utc(raw.updated_at).local().format('DD.MM.YYYY HH:mm')
      : null;
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
    };
  }
}
