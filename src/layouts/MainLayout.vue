<template>
  <q-layout view="lHh Lpr lFf">
    <LeftDrawer />
    <q-page-container v-if="ready">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import LeftDrawer from 'src/layouts/drawer/LeftDrawer.vue';
import { authentication } from 'src/models/authentication/authentication';
import { onMounted, ref } from 'vue';

const ready = ref(false);

const q = useQuasar();

const setBodyScrollClass = () => {
  if (q.platform.is.win) {
    const body = document.getElementsByTagName('body');
    if (body.length) body[0].classList.add('custom-scroll-bar');
  }
};

onMounted(async () => {
  setBodyScrollClass();

  try {
    await authentication.me();
  } catch (e) {
    console.log(e);
  }

  ready.value = true;

  if (!authentication.user) {
    window.location.href =
      '/auth?path=' + window.location.href.replace(origin + '/', '');
  }
});
</script>
