<template>
  <q-layout view="hhr lpr fff" style="overflow-y: hidden; overflow-x: hidden">
    <div
      style="height: 100vh"
      class="row column justify-center content-center background"
    >
      <div class="column auth-block items-center text-white py-20 gap-15 px-10">
        <div class="mega-header2 mb-10">Авторизация</div>
        <div class="full-width row justify-center">
          <CInput
            v-model="data.email"
            :rules="[rules.email]"
            label="Email"
            height="42px"
            :width="$q.screen.lt.sm ? '100%' : '350px'"
          />
        </div>
        <div class="full-width row justify-center">
          <CInput
            v-model="data.password"
            height="42px"
            :type="showPassword ? 'text' : 'password'"
            :icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
            label="Пароль"
            :width="$q.screen.lt.sm ? '100%' : '350px'"
            icon-color="black"
            @iconClick="showPassword = !showPassword"
          />
        </div>
        <CButton
          @click="auth()"
          class="subtitle-text mt-5"
          height="46px"
          :disabled="!isLogInAvailable"
          :loading="loading"
          label="Войти"
          :width="$q.screen.lt.sm ? '100%' : '300px'"
        />
      </div>
    </div>
  </q-layout>
</template>
<script lang="ts" setup>
import CInput from 'src/components/templates/inputs/CInput.vue';
import CButton from 'src/components/templates/buttons/CButton.vue';
import { computed, ref } from 'vue';
import { authentication } from 'src/models/authentication/authentication';
import { useRoute } from 'vue-router';
import rules from 'src/corexModels/rules';

const data = ref<{
  email: string | null;
  password: string | null;
}>({
  email: null,
  password: null,
});

const route = useRoute();

const loading = ref(false);

const showPassword = ref(false);

const isLogInAvailable = computed(() => {
  return !!data.value.email?.length && !!data.value.password?.length;
});

const auth = async () => {
  loading.value = true;
  try {
    const res = await authentication.login(data.value);
    if (res) {
      if (route.query.path) {
        window.location.href = '/' + String(route.query.path);
      } else window.location.href = '/';
    }
  } catch {}
  loading.value = false;
};
</script>

<style lang="scss" scoped>
.auth-block {
  width: 100%;
  max-width: 450px;
  border: 1px $primary solid;
  background-color: $black;
  border-radius: 10px;
}
</style>
