<template>
  <div v-if="item">
    <div class="full-width big-header bold">
      Расписание автоматической выгрузки
    </div>
    <div class="column full-width mt-13 gap-10">
      <div class="column full-width gap-4">
        <div class="text-secondary">
          Последняя отправка: {{ item.last_send || '-' }}
        </div>
        <div class="text-secondary">
          Следующая отправка: {{ item.next_send || '-' }}
        </div>
      </div>
      <q-checkbox v-model="item.active" dense label="Включено" />
      <div class="row full-width gap-15 no-wrap">
        <CSelect
          external-label="Тип"
          style="max-width: 500px; width: 100%"
          :model-value="scheduleTypeNames[item.type]"
          @update:model-value="item.type = $event.value"
          :items="scheduleTypes"
          default
        />
        <div class="bordered-block row gap-5 mt-15">
          <q-icon name="fa-light fa-info-circle" size="18px" />
          Отражает единицу измерения интервала между загрузкой накладных
        </div>
      </div>
      <div class="row full-width gap-15 no-wrap">
        <CInput
          style="max-width: 500px; width: 100%"
          default
          v-model="item.interval"
          type="number"
          label="Интервал"
        />
        <div class="bordered-block row gap-5 mt-3">
          <q-icon name="fa-light fa-info-circle" size="18px" />
          Разница во времени между итерациями загрузки накладных
        </div>
      </div>
      <div class="row full-width justify-center mt-10">
        <CButton
          @click="save()"
          width="180px"
          label="Сохранить"
          :disabled="!isSaveAvailable"
          :loading="loading"
          icon="fa-regular fa-floppy-disk"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep, isEqual } from 'lodash';
import {
  WaybillSchedule,
  scheduleTypeNames,
  scheduleTypes,
} from 'src/models/waybill/waybill';
import { waybillRepo } from 'src/models/waybill/waybillRepo';
import { computed, onMounted, ref } from 'vue';
import CSelect from 'src/components/templates/inputs/CSelect.vue';
import CInput from 'src/components/templates/inputs/CInput.vue';
import CButton from 'src/components/templates/buttons/CButton.vue';
import { Notify } from 'quasar';

const item = ref<WaybillSchedule | null>(null);

const initialItem = ref<WaybillSchedule | null>(null);

const loading = ref(false);

const isSaveAvailable = computed(() => {
  return !isEqual(initialItem.value, item.value);
});

const save = async () => {
  try {
    loading.value = true;
    const res = await waybillRepo.setSchedule(item.value);
    item.value = cloneDeep(res);
    Notify.create({
      message: 'Расписание успешно обновлено',
    });
  } catch {
    Notify.create({
      message: 'Ошибка при обновлении расписания',
      color: 'danger',
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  void waybillRepo.getSchedule().then((res) => {
    initialItem.value = cloneDeep(res);
    item.value = cloneDeep(res);
  });
});
</script>

<style lang="scss" scoped></style>
