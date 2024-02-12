<template>
  <div>
    <div class="full-width big-header bold">Концепции</div>
    <div class="column full-width mt-13">
      <template v-if="$conception.items.length">
        <div
          class="row full-width px-7 py-5 bg-secondary1 rounded-10 bold mb-5"
        >
          <div class="col-3">Название</div>
          <div class="col-2">Название юр. лица</div>
          <div class="col-2">ИНН</div>
          <div class="col-2">КПП</div>
          <div class="col-2">БИК</div>
          <div class="col-1 row justify-center">Статус</div>
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
            class="row full-width px-7 py-5 cursor-pointer item-row"
          >
            <div class="col-3 ellipsis">{{ el.name || '-' }}</div>
            <div class="col-2 ellipsis pr-5">{{ el.legalName || '-' }}</div>
            <div class="col-2 ellipsis pr-5">{{ el.inn || '-' }}</div>
            <div class="col-2 ellipsis pr-5">{{ el.kpp || '-' }}</div>
            <div class="col-2 ellipsis pr-5">{{ el.bik || '-' }}</div>
            <div class="col-1 row justify-center">
              <q-icon
                size="18px"
                :color="el.checkAccount ? 'success' : 'danger'"
                :name="
                  el.checkAccount ? 'fa-solid fa-check' : 'fa-solid fa-xmark'
                "
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
import Pagination from 'src/components/templates/inputs/Pagination.vue';
import { conceptionRepo } from 'src/models/conception/conceptionRepo';
import { onMounted } from 'vue';

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
</style>