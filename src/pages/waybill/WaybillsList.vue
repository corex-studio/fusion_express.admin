<template>
  <div>
    <div class="full-width big-header bold">Накладные</div>
    <div class="column full-width mt-13">
      <template v-if="$waybill.items.length">
        <div
          class="row full-width px-7 py-5 bg-secondary1 rounded-10 bold mb-5"
        >
          <div class="col-1">Номер</div>
          <div class="col-3">Дата документа</div>
          <div class="col-3">Дата создания</div>
          <div class="col-3">Дата обновления</div>
          <div class="col-2">Статус</div>
        </div>
        <template v-for="(el, index) in $waybill.items" :key="index">
          <q-separator v-if="index" />
          <div class="row full-width px-7 py-5 item-row">
            <div class="col-1">{{ el.number }}</div>

            <div class="col-3">{{ el.documentDate }}</div>
            <div class="col-3">{{ el.createdAt }}</div>
            <div class="col-3">{{ el.updatedAt }}</div>
            <div class="col-2">
              <q-badge class="body" :color="waybillTypeNames[el.status].color">
                {{ waybillTypeNames[el.status].label }}
              </q-badge>
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
</template>
<script lang="ts" setup>
import Pagination from 'src/components/templates/inputs/Pagination.vue';
import { waybillTypeNames } from 'src/models/waybill/waybill';
import { waybillRepo } from 'src/models/waybill/waybillRepo';
import { onMounted } from 'vue';

const loadItems = async (page = 1, appendItems = false) => {
  await waybillRepo.list(
    {},
    {
      page,
      appendItems,
    }
  );
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
</style>
