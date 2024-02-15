<template>
  <div>
    <div class="full-width row justify-between">
      <div class="big-header bold">Склады</div>
      <CButton
        @click="loadWarehouses()"
        :loading="loading"
        label="Загрузить склады"
      />
    </div>
    <div class="bordered-block column gap-3 pa-5 mt-10">
      <div class="row gap-4">
        <q-icon name="fa-light fa-info-circle" size="18px" />
        <div class="bold">Список складов, загруженных из iiko</div>
      </div>

      <div>
        <span class="bold">Активность</span> - отвечает за включение и
        отключение в выгрузку накладных с данного склада
      </div>
    </div>
    <div class="column full-width mt-13">
      <template v-if="$warehouse.items.length">
        <div
          class="row full-width px-7 py-5 bg-secondary1 rounded-10 bold mb-5"
        >
          <div class="col-6">Название</div>
          <div class="col-5">Дата создания</div>
          <div class="col-1 row justify-center">Активность</div>
        </div>
        <template v-for="(el, index) in $warehouse.items" :key="index">
          <q-separator v-if="index" />
          <div class="row full-width items-center px-7 py-4 item-row">
            <div class="col-6 ellipsis">{{ el.name || '-' }}</div>
            <div class="col-5 ellipsis">{{ el.createdAt || '-' }}</div>
            <div class="col-1 row justify-center">
              <CIconButton
                @click="activeClickHandler(el)"
                :loading="$warehouse.loadings.update"
                :icon="el.active ? 'fa-solid fa-check' : 'fa-solid fa-xmark'"
                color="secondary1"
                :icon-color="el.active ? 'success' : 'danger'"
                size="34px"
              />
            </div>
          </div>
        </template>
        <Pagination
          :loading="$warehouse.loadings.list"
          class="px-10 mt-15"
          @update:modelValue="loadItems($event)"
          @appendItems="loadItems($event, true)"
          :page="$warehouse.pagination.page"
          :last-page="$warehouse.pagination.last_page"
        ></Pagination>
      </template>
      <div v-else class="subtitle-text">Элементов не найдено</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Notify } from 'quasar';
import CButton from 'src/components/templates/buttons/CButton.vue';
import { onMounted, ref } from 'vue';
import { warehouseRepo } from 'src/models/warehouse/warehouseRepo';
import { Warehouse } from 'src/models/warehouse/warehouse';
import Pagination from 'src/components/templates/inputs/Pagination.vue';
import CIconButton from 'src/components/templates/buttons/CIconButton.vue';

const loading = ref(false);

const activeClickHandler = async (item: Warehouse) => {
  try {
    item.active = !item.active;
    await warehouseRepo.update(item);
  } catch {
    Notify.create({
      message: 'Ошибка при изменении активности склада',
      color: 'danger',
    });
  }
};

const loadWarehouses = async () => {
  try {
    loading.value = true;
    await warehouseRepo.loadWarehouses();
    Notify.create({
      message: 'Склады успешно загружены',
    });
    await loadItems();
  } catch {
    Notify.create({
      message: 'Ошибка при загрузке складов',
      color: 'danger',
    });
  } finally {
    loading.value = false;
  }
};

const loadItems = async (page = 1, appendItems = false) => {
  await warehouseRepo.list(
    {},
    {
      page: page ? page : warehouseRepo.pagination.page,
      appendItems: appendItems,
      pageSize: 10,
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

.bordered-block {
  border-radius: 12px;
  border: 1px $secondary1 solid;
  max-width: 650px;
  width: 100%;
}
</style>
