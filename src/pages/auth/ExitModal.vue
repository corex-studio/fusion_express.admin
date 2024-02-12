<template>
  <CDialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="345px"
  >
    <div class="column full-width items-center gap-10">
      <div style="text-align: center" class="header2">
        Вы точно хотите выйти из аккаунта?
      </div>
      <div class="row full-width gap-5">
        <CButton
          @click="$emit('update:modelValue', false)"
          class="col"
          label="Отмена"
        />
        <CButton @click="$emit('accept')" class="col" label="Подтвердить" />
      </div>
    </div>
  </CDialog>
</template>
<script lang="ts" setup>
import CButton from 'src/components/templates/buttons/CButton.vue';
import CDialog from 'src/components/templates/dialogs/CDialog.vue';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (evt: 'update:modelValue', value: boolean): void;
  (evt: 'accept'): void;
}>();
</script>
