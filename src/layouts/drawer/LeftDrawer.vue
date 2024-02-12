<template>
  <q-drawer
    v-model="drawer"
    :width="200"
    class="bg-black column justify-between pt-6 items-center pb-10"
  >
    <div class="column full-width items-center">
      <div class="top-block row justify-center items-center">
        <q-img src="~assets/logo.png" />
      </div>

      <q-separator
        class="mt-10 mb-20"
        color="white"
        style="width: 75%; opacity: 0.4"
      />
      <div class="column full-width gap-18 items-center">
        <div
          v-for="(el, index) in tabs"
          @click="el.click()"
          style="transition: 0.3s"
          :key="index"
          :class="el.selected ? 'text-accent' : 'text-white'"
          class="subtitle-text cursor-pointer row items-baseline gap-10 full-width pl-12 relative-position tab-row"
        >
          <transition name="fade">
            <div v-if="el.selected" class="selection-mark"></div>
          </transition>
          <q-icon size="26px" :name="el.icon" />
          {{ el.label }}
        </div>
      </div>
    </div>
    <div
      @click="exitModal = true"
      class="bottom-block cursor-pointer row items-center gap-10 px-14"
    >
      <q-icon name="fa-solid fa-arrow-right-from-bracket" size="26px" />
      <div class="subtitle-text">Выйти</div>
    </div>
  </q-drawer>
  <ExitModal v-model="exitModal" @accept="logOut()" />
</template>
<script lang="ts" setup>
import { authentication } from 'src/models/authentication/authentication';
import ExitModal from 'src/pages/auth/ExitModal.vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const drawer = ref(true);

const router = useRouter();

const route = useRoute();

const exitModal = ref(false);

const tabs = computed(() => {
  return [
    {
      label: 'Концепции',
      click: () => {
        void router.push({
          name: 'conceptionsList',
        });
      },
      selected: ['conceptionsList', 'conceptionDetail'].includes(
        String(route.name)
      ),
      route: 'conceptionsList',
      icon: 'fa-solid fa-block-quote',
    },
    {
      label: 'Расписание',
      click: () => {
        void router.push({
          name: 'schedulePage',
        });
      },
      selected: ['schedulePage'].includes(String(route.name)),
      route: 'schedulesList',
      icon: 'fa-solid fa-calendar-days',
    },
    {
      label: 'Накладные',
      click: () => {
        void router.push({
          name: 'waybillsList',
        });
      },
      selected: ['waybillsList'].includes(String(route.name)),
      route: 'waybillsList',
      icon: 'fa-solid fa-files',
    },
  ];
});

const logOut = () => {
  authentication.logout();
  void router.replace({ name: 'auth' });
};
</script>

<style lang="scss" scoped>
.top-block {
  height: 80px;
  width: 80px;
}

.tab-row:hover {
  color: $accent !important;
}

.bottom-block {
  background-color: white;
  border-radius: 100px;
  transition: 0.35s;
  height: 60px;
  width: 160px;
}

.bottom-block:hover {
  border-radius: 0px;
  background-color: $accent;
  color: white;
  width: 200px;
}

.selection-mark {
  width: 3px;
  height: 24px;
  background-color: $accent;
  position: absolute;
  left: 0;
  border-radius: 100px;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from {
  transform: translateX(20px);
  height: 16px;
}

.fade-leave-to {
  transform: translateX(20px);
  height: 16px;
  opacity: 0;
}
</style>
