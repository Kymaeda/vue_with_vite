<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue';
import Money from './Money.vue';
// import { useStore } from 'vuex';
import { useRate } from './composable/useRate';

let timeout = null;

// const store = useStore();
const currentBalance = ref(0);
// const inUSD = computed(() => currentBalance.value * store.state.rate);

const { rate, setRate } = useRate();
const inUSD = computed(() => currentBalance.value * rate.value);

const sessionCounter = ref(0);
const history = ref([]);
const exchangeRecords = reactive({
  highestBalance: null,
});

// NOTE: do not `.value`
watch(currentBalance, (newValue, _oldValue) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    sessionCounter.value++;
    history.value.push(newValue);

    if (currentBalance.value > exchangeRecords.highestBalance) {
      exchangeRecords.highestBalance = currentBalance.value;
    }
  }, 500);
});
// NOTE: to watch array, need `.value`
watch(history.value, () => console.log('new history added...'));
// NOTE: A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types
// `() => exchangeRecords.highestBalance` works as getter function
watch(
  () => exchangeRecords.highestBalance,
  () => console.log('exhange record has changed...')
);

onMounted(() =>
  setInterval(
    () => (setRate([1.13, 1.14, 1.15][Math.floor(Math.random() * 3)])),
    // store.commit(
    //   'setRate',
    //   [1.13, 1.14, 1.15][Math.floor(Math.random() * 3)]
    // ),
    1000
  )
);
</script>

<template>
  <Money :currency="`EUR`" :balance="currentBalance" />
  <Money :currency="`US`" :balance="inUSD" />
  <div>
    <input type="text" v-model.number="currentBalance" />
  </div>
</template>
