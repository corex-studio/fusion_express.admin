<template>
  <div v-if="item">
    <div class="row full-width justify-between">
      <div class="row gap-8">
        <CIconButton
          @click="
            $router.push({
              name: 'conceptionsList',
            })
          "
          icon="fa-regular fa-angle-left"
          color="primary"
          size="38px"
          icon-size="20px"
        />
        <div class="column gap-2">
          <div class="header bold row items-center gap-5">
            Концепция: {{ $conception.item?.name || 'Без названия' }}
          </div>
          <div class="text-secondary row gap-3">
            Статус:
            <q-icon
              class="mb-1"
              size="20px"
              :color="$conception.item?.isConfigured ? 'success' : 'danger'"
              :name="
                $conception.item?.isConfigured
                  ? 'fa-solid fa-check'
                  : 'fa-solid fa-xmark'
              "
            />
          </div>
          <div class="text-secondary">
            Дата создания: {{ $conception.item?.createdAt }}
          </div>
          <div class="text-secondary">
            Дата последнего изменения: {{ $conception.item?.updatedAt }}
          </div>
        </div>
      </div>
      <CButton
        @click="save()"
        icon="fa-regular fa-floppy-disk"
        width="180px"
        :loading="loading"
        :disabled="!isSaveAvailable"
        label="Сохранить"
      />
    </div>
    <div style="max-width: 700px" class="column full-width gap-10 mt-13">
      <q-checkbox dense v-model="item.active" label="Активность" />
      <CInput default v-model="item.legalName" label="Название юр. лица" />
      <CInput default v-model="item.inn" label="ИНН" />
      <CInput default v-model="item.kpp" label="КПП" />
      <CInput default v-model="item.bik" label="БИК" />
      <CInput default v-model="item.bank1" label="Банк 1" />
      <CInput default v-model="item.bank2" label="Банк 2" />
      <CInput default v-model="item.account" label="Счет" />
      <CInput default v-model="item.corrAccount" label="Кор. счет" />
      <CInput default v-model="item.checkAccount" label="Расчетный счет" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep, isEqual } from 'lodash';
import { Notify } from 'quasar';
import CButton from 'src/components/templates/buttons/CButton.vue';
import CIconButton from 'src/components/templates/buttons/CIconButton.vue';
import CInput from 'src/components/templates/inputs/CInput.vue';
import { Conception } from 'src/models/conception/conception';
import { conceptionRepo } from 'src/models/conception/conceptionRepo';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const item = ref<Conception | null>(null);

const loading = ref(false);

const route = useRoute();

const isSaveAvailable = computed(() => {
  return (
    !isEqual(item.value, conceptionRepo.item) &&
    !!item.value?.inn?.length &&
    !!item.value.kpp?.length &&
    !!item.value.bik?.length &&
    !!item.value.bank1?.length &&
    !!item.value.bank2?.length &&
    !!item.value.account?.length &&
    !!item.value.corrAccount?.length &&
    !!item.value.checkAccount?.length
  );
});

const save = async () => {
  try {
    loading.value = true;
    const res = await conceptionRepo.update(item.value);
    conceptionRepo.item = cloneDeep(res);
    item.value = cloneDeep(res);
    Notify.create({
      message: 'Концепция успешно сохранена',
    });
  } catch {
    Notify.create({
      message: 'Ошибка при сохранении концепции',
      color: 'danger',
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  void conceptionRepo
    .retrieve(String(route.params.conceptionId))
    .then((res) => {
      item.value = cloneDeep(res);
    });
});
</script>
