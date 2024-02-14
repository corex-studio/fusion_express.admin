<template>
  <CDialog
    width="400px"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="subtitle-text bold mb-10">Загрузка накладных</div>
    <div class="column full-width gap-10">
      <CInput default :model-value="dateFrom" external-label="Дата от">
        <q-menu auto-close>
          <q-date
            :locale="locale"
            v-model="dateFrom"
            mask="DD.MM.YYYY"
          ></q-date>
        </q-menu>
      </CInput>
      <CInput default :model-value="dateTo" external-label="Дата до">
        <q-menu auto-close>
          <q-date
            :locale="locale"
            v-model="dateTo"
            mask="DD.MM.YYYY"
          ></q-date> </q-menu
      ></CInput>
    </div>
    <div class="row mt-15 full-width justify-center">
      <CButton
        :disabled="!dateFrom || !dateTo"
        :loading="loading"
        @click="process()"
        label="Загрузить"
        width="230px"
      />
    </div>
  </CDialog>
</template>
<script lang="ts" setup>
import moment from 'moment';
import { Notify } from 'quasar';
import CButton from 'src/components/templates/buttons/CButton.vue';
import CDialog from 'src/components/templates/dialogs/CDialog.vue';
import CInput from 'src/components/templates/inputs/CInput.vue';
import { waybillRepo } from 'src/models/waybill/waybillRepo';
import { ref } from 'vue';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', value: boolean): void;
  (evt: 'success'): void;
}>();

const dateFrom = ref<string | null>(null);
const dateTo = ref<string | null>(null);

const loading = ref(false);

const locale: {
  days: Array<string>;
  daysShort: Array<string>;
  months: Array<string>;
  monthsShort: Array<string>;
  firstDayOfWeek: number;
} = {
  days: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthsShort: [
    'Янв',
    'Февр',
    'Март',
    'Апр',
    'Май',
    'Июнь',
    'Июль',
    'Авг',
    'Сент',
    'Окт',
    'Нояб',
    'Дек',
  ],
  firstDayOfWeek: 1,
};

const process = async () => {
  try {
    loading.value = true;
    await waybillRepo.process({
      date_from: moment(dateFrom.value, 'DD.MM.YYYY')
        .utc()
        .format('YYYY-MM-DD HH:mm:ss'),
      date_to: moment(dateTo.value, 'DD.MM.YYYY')
        .utc()
        .format('YYYY-MM-DD HH:mm:ss'),
    });
    Notify.create({
      message: 'Накладные успешно загружены',
    });
    emit('success');
  } catch {
    Notify.create({
      message: 'Ошибка загрузки накладных',
      color: 'danger',
    });
  } finally {
    loading.value = false;
  }
};
</script>
