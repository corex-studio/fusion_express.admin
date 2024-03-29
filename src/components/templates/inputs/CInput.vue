<template>
  <div :class="{ 'menu-mode': menuMode }">
    <div
      v-if="externalLabel"
      class="row gap-3 items-end"
      :class="externalLabelClass ? externalLabelClass : 'mb-4 helper-text bold'"
    >
      <slot name="externalLabelPrepend"></slot>
      {{ externalLabel }}
    </div>
    <q-input
      :dark="white"
      @update:model-value="updateModelValue"
      :modelValue="modelValue"
      @keyup.enter.prevent="$emit('enter')"
      @blur="_blurInput"
      @keydown.right="emitDirectionKeys('right', $event)"
      @keydown.left="emitDirectionKeys('left', $event)"
      @keydown.up.prevent="$emit('up')"
      @keydown.down.prevent="$emit('down')"
      @focus="_focusInput"
      ref="inputRef"
      :readonly="_readonly"
      :color="color"
      :label-color="labelColor"
      :standout="standout"
      :label="label"
      :type="_type"
      :hint="hint"
      :mask="mask"
      :rules="rules"
      :fill-mask="fillMask"
      :clearable="clearable"
      :borderless="borderless"
      :filled="filled"
      :loading="loading"
      :outlined="_outlined"
      :dense="dense"
      :input-style="inputStyle"
      :input-class="inputClass"
      :placeholder="placeholder"
      :bg-color="_bgColor"
      :autogrow="autoGrow"
      :disabled="_disabled"
      :disable="_disabled"
      :style="`width:${width || 'unset'}; height:${_height};`"
      :class="{
        'label-top': _labelTop,
        'no-icon': _noIcon,
        default: $props.default,
      }"
      :unmasked-value="unmaskedValue"
      :square="square ? true : false"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
    >
      <template v-slot:prepend v-if="$slots.prepend">
        <slot name="prepend"></slot>
        <q-icon
          v-if="leftIcon"
          :name="leftIcon"
          :style="`font-size:${iconSize || '16px'} !important; color:${
            iconColor || 'white'
          }; opacity:${iconOpacity}; `"
          @click="$emit('iconClick')"
        />
      </template>
      <template v-slot:append>
        <slot name="append"></slot>
        <q-icon
          v-if="icon"
          :name="icon"
          :style="`font-size:${iconSize || '16px'} !important; color:${
            iconColor || 'white'
          }; opacity:${iconOpacity}; `"
          :class="`${iconClass}`"
          @click="$emit('iconClick')"
        />
      </template>
      <template v-slot:loading>
        <q-spinner :color="loadingColor" :thickness="3" />
      </template>
      <template v-slot:error> 1234</template>
      <slot></slot>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { QInput, ValidationRule } from 'quasar';
import { computed, ref, onMounted } from 'vue';
import { QInputProps } from 'quasar';

const emit = defineEmits([
  'update:modelValue',
  'enter',
  'iconClick',
  'focus',
  'blur',
  'right',
  'left',
  'up',
  'down',
]);

const props = defineProps<{
  modelValue: string | number | null | undefined;
  customFormattedValue?: string | number;
  icon?: string;
  leftIcon?: string;
  autofocus?: boolean;
  label?: string;
  disabled?: boolean;
  disable?: boolean;
  borderless?: boolean;
  filled?: boolean;
  outlined?: boolean;
  labelColor?: string;
  height?: string;
  width?: string;
  dense?: boolean;
  clearable?: boolean;
  standout?: string | boolean;
  color?: string;
  iconSize?: string;
  type?: QInputProps['type'];
  inputStyle?: object | [] | string;
  iconColor?: string;
  bgColor?: string;
  inputClass?: string;
  iconOpacity?: string;
  labelTop?: boolean;
  noIcon?: boolean;
  placeholder?: string;
  default?: boolean;
  textArea?: boolean;
  hint?: string;
  readonly?: boolean;
  mask?: string;
  fillMask?: boolean;
  loading?: boolean;
  loadingColor?: string;
  rules?: ValidationRule[];
  unmaskedValue?: boolean;
  currency?: boolean;
  precision?: number;
  preventEmitDirection?: boolean;
  square?: boolean;
  autoGrow?: boolean;
  autocomplete?: string;
  iconClass?: string;
  white?: boolean;
  externalLabel?: string;
  externalLabelClass?: string;
  menuMode?: boolean;
}>();

const emitDirectionKeys = (
  direction: 'up' | 'down' | 'left' | 'right',
  event: KeyboardEvent
) => {
  if (props.preventEmitDirection) event.preventDefault();
  emit(direction);
};

const focused = ref(false);
const mounted = ref(false);
const _focusInput = () => {
  focused.value = true;
  emit('focus');
};

const _blurInput = () => {
  focused.value = false;
  emit('blur');
};

const _readonly = computed(() => {
  if (props.readonly || props.menuMode) return true;
  return props.readonly;
});

const _outlined = computed(() => {
  if (!props.outlined && (props.default || props.textArea)) {
    return true;
  }
  return props.outlined;
});

const _bgColor = computed(() => {
  if (!props.bgColor && (props.default || props.textArea)) {
    return 'white';
  } else if (!props.bgColor && !props.default) {
    return 'white';
  }
  return props.bgColor;
});

const _noIcon = computed(() => {
  if (!props.noIcon && props.textArea) {
    return true;
  }
  return props.noIcon;
});

const _labelTop = computed(() => {
  if (!props.labelTop && props.textArea) {
    return true;
  }
  return props.labelTop;
});

const _height = computed(() => {
  if (!props.height && props.textArea) {
    return 'unset';
  } else if (!props.height && !props.textArea) {
    return '42px';
  }
  return props.height;
});

const _type = computed(() => {
  if (props.textArea) {
    return 'textarea';
  }
  return props.type;
});

const _disabled = computed(() => props.disabled || props.disable);

const updateModelValue = (value: string | number | null) => {
  if (!props.currency) emit('update:modelValue', value || null);
};

onMounted(() => {
  mounted.value = true;
});
</script>

<style lang="scss">
body.screen--sm {
  .q-field {
    max-width: unset !important;
  }
}

.q-input:not(.q-file).q-field--float .q-field__label {
  transform: translate(0, -50%) scale(0.85) !important;
  top: 0px !important;
  padding: 0 5px;
  z-index: 1;
  transition: all 0.3s;
  width: fit-content;
}

.q-input:not(.q-file).q-field--float.label-top .q-field__label {
  margin: 0 5px;
}

.q-field__label {
  transition: all 0.3s;
  top: 50%;
  display: flex;
  transform: translate(0, -50%);
}

textarea + .q-field__label {
  top: 15px;
  left: 7px;
}

.q-input:not(.q-file) .label-top .q-field__label {
  top: 10%;
  padding-left: 8px;
}

.q-input:not(.q-file).q-field--with-bottom {
  padding-bottom: 0px !important;
}

.q-input:not(.q-file).q-field__bottom.q-field__bottom--animated {
  margin: 4px;
}

.no-icon .q-field__append .q-icon.text-negative.material-icons {
  display: none;
}

.q-input .q-field__label {
  color: $black !important;
}
</style>
