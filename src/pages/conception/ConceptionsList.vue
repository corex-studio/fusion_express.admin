<template>
  <div>
    <div class="full-width row justify-between">
      <div class="big-header bold">Концепции</div>

      <CButton
        @click="loadConceptions()"
        :loading="loading"
        label="Загрузить концепции"
      />
    </div>
    <div class="bordered-block column gap-3 pa-5 mt-10">
      <div class="row gap-4">
        <q-icon name="fa-light fa-info-circle" size="18px" />
        <div class="bold">Список концепций, загруженных из iiko</div>
      </div>
      <div>
        <span class="bold">Статус</span> - отображает заполнение концепции
        юридическими данным
      </div>

      <div>
        <span class="bold">Активность</span> - отвечает за включение и
        отключение в выгрузку накладных с данной концпецией
      </div>
    </div>
    <div class="column full-width mt-13">
      <template v-if="$conception.items.length">
        <div
          class="row full-width px-7 py-5 bg-secondary1 rounded-10 bold mb-5"
        >
          <div class="col-2">Название</div>
          <div class="col-2">Название юр. лица</div>
          <div class="col-2">ИНН</div>
          <div class="col-2">КПП</div>
          <div class="col-2">БИК</div>
          <div class="col-1 row justify-center">Статус</div>
          <div class="col-1 row justify-center">Активность</div>
        </div>
        <template v-for="(el, index) in $conception.items" :key="index">
          <q-separator v-if="index" />
          <div
            @click="
              $router.push({
                name: 'conceptionDetail',
                params: {
                  conceptionId: el.id,
                },
              })
            "
            class="row full-width px-7 py-4 items-center cursor-pointer item-row"
          >
            <div class="col-2 ellipsis">{{ el.name || '-' }}</div>
            <div class="col-2 ellipsis pr-5">{{ el.legalName || '-' }}</div>
            <div class="col-2 ellipsis pr-5">{{ el.inn || '-' }}</div>
            <div class="col-2 ellipsis pr-5">{{ el.kpp || '-' }}</div>
            <div class="col-2 ellipsis pr-5">{{ el.bik || '-' }}</div>
            <div class="col-1 row justify-center">
              <q-icon
                size="18px"
                :color="el.isConfigured ? 'success' : 'danger'"
                :name="
                  el.isConfigured ? 'fa-solid fa-check' : 'fa-solid fa-xmark'
                "
              />
            </div>
            <div class="col-1 row justify-center">
              <CIconButton
                @click.capture.stop="conceptionActiveClickHandler(el)"
                :icon="el.active ? 'fa-solid fa-check' : 'fa-solid fa-xmark'"
                :icon-color="el.active ? 'success' : 'danger'"
                color="secondary1"
                size="34px"
                :loading="$conception.loadings.update"
              />
            </div>
          </div>
        </template>
        <Pagination
          :loading="$conception.loadings.list"
          class="px-10 mt-15"
          @update:modelValue="loadItems($event)"
          @appendItems="loadItems($event, true)"
          :page="$conception.pagination.page"
          :last-page="$conception.pagination.last_page"
        ></Pagination>
      </template>
      <div v-else class="subtitle-text">Элементов не найдено</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Notify } from 'quasar';
import CButton from 'src/components/templates/buttons/CButton.vue';
import CIconButton from 'src/components/templates/buttons/CIconButton.vue';
import Pagination from 'src/components/templates/inputs/Pagination.vue';
import { conceptionRepo } from 'src/models/conception/conceptionRepo';
import { Conception } from 'src/models/conception/conception';
import { onMounted, ref } from 'vue';

const loading = ref(false);

const conceptionActiveClickHandler = async (item: Conception) => {
  try {
    item.active = !item.active;
    await conceptionRepo.update(item);
  } catch {
    Notify.create({
      message: 'Ошибка при изменении активности концепции',
      color: 'danger',
    });
  }
};

const loadConceptions = async () => {
  try {
    loading.value = true;
    await conceptionRepo.loadConceptions();
    Notify.create({
      message: 'Концепции успешно загружены',
    });
    await loadItems();
  } catch {
    Notify.create({
      message: 'Ошибка при загрузке концепций',
      color: 'danger',
    });
  } finally {
    loading.value = false;
  }
};

const loadItems = async (page = 1, appendItems = false) => {
  await conceptionRepo.list(
    {},
    {
      page: page ? page : conceptionRepo.pagination.page,
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
