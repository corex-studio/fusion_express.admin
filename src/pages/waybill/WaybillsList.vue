<template>
  <div>
    <div class="row full-width justify-between items-center">
      <div class="big-header bold">Накладные</div>
      <CButton
        @click="loadModal = true"
        label="Загрузить накладные"
        width="180px"
      />
    </div>
    <div class="bordered-block column gap-3 pa-5 mt-10">
      <div class="row gap-4">
        <q-icon name="fa-light fa-info-circle" size="18px" />
        <div class="bold">Список обработанных накладных из iiko</div>
      </div>
      <div>
        <span class="bold"> Статусы: </span>
        <div class="pl-2">
          <li>Создана - Накладная загружена и не обработана</li>
          <li>
            Обработана - Накладная загружена и успешно обработана( поле
            счет-фактура было изменено)
          </li>
          <li>
            Ошибка - Во время обработки накладной возникла одна или несколько
            ошибок
          </li>
        </div>
      </div>
    </div>
    <div class="column full-width mt-13">
      <template v-if="$waybill.items.length">
        <div
          class="row full-width px-7 py-5 bg-secondary1 rounded-10 bold mb-5"
        >
          <div class="col-1">Номер</div>
          <div class="col-2">Концепция</div>
          <div class="col-2">Склад</div>
          <div class="col-2">Дата документа</div>
          <div class="col-2">Дата создания</div>
          <div class="col-2">Дата обновления</div>
          <div class="col-1">Статус</div>
        </div>
        <template v-for="(el, index) in $waybill.items" :key="index">
          <q-separator v-if="index" />
          <div class="row full-width px-7 py-5 item-row">
            <div class="col-1">{{ el.number }}</div>
            <div class="col-2">{{ el.conception?.name || '-' }}</div>
            <div class="col-2">{{ el.warehouse?.name || '-' }}</div>

            <div class="col-2">{{ el.documentDate }}</div>
            <div class="col-2">{{ el.createdAt }}</div>
            <div class="col-2">{{ el.updatedAt }}</div>
            <div class="col-1 row no-wrap items-center gap-4">
              <q-badge class="body" :color="waybillTypeNames[el.status].color">
                {{ waybillTypeNames[el.status].label }}
              </q-badge>

              <q-icon
                v-if="el.status === WaybillType.FAILED"
                class="cursor-pointer"
                size="18px"
                name="fa-light fa-info-circle"
              >
                <q-tooltip>
                  {{ el.error?.error_message }}
                </q-tooltip>
              </q-icon>
            </div>
          </div>
        </template>
        <Pagination
          :loading="$waybill.loadings.list"
          class="px-10 mt-15"
          @update:modelValue="loadItems($event)"
          @appendItems="loadItems($event, true)"
          :page="$waybill.pagination.page"
          :last-page="$waybill.pagination.last_page"
        ></Pagination>
      </template>
      <div v-else class="subtitle-text">Элементов не найдено</div>
    </div>
  </div>
  <LoadWaybillsModal
    v-model="loadModal"
    @success="waybillsSuccessfullyLoaded()"
  />
</template>
<script lang="ts" setup>
import CButton from 'src/components/templates/buttons/CButton.vue';
import Pagination from 'src/components/templates/inputs/Pagination.vue';
import { WaybillType, waybillTypeNames } from 'src/models/waybill/waybill';
import { waybillRepo } from 'src/models/waybill/waybillRepo';
import { onMounted, ref } from 'vue';
import LoadWaybillsModal from './LoadWaybillsModal.vue';

const loadModal = ref(false);

const loadItems = async (page = 1, appendItems = false) => {
  await waybillRepo.list(
    {},
    {
      page,
      appendItems,
    }
  );
};

const waybillsSuccessfullyLoaded = () => {
  loadModal.value = false;
  void loadItems();
};

onMounted(() => {
  void loadItems();
});
</script>

<style lang="scss" scoped>
.item-row:hover {
  background-color: #c4c4c421;
  outline: 1px $primary solid;
  transition: 0.35s;
}

.bordered-block {
  border-radius: 12px;
  border: 1px $secondary1 solid;
  max-width: 650px;
  width: 100%;
}
</style>
