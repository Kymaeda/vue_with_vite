<script>
import { ref, computed, reactive, watch } from 'vue';

let timeout = null;

export default {
  setup() {
    const currentBalance = ref(0);
    const inUSD = computed(() => (currentBalance.value * 1.14).toFixed(2));

    const sessionCounter = ref(0);
    const history = ref([]);
    const exchangeRecords = reactive({
      highestBalance: null,
    });

    // NOTE: do not `.value`
    watch(currentBalance, (newValue, oldValue) => {
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

    return { currentBalance, inUSD, sessionCounter, history, exchangeRecords };
  },
};
</script>

<template>
  <div>Money in Bank: {{ currentBalance }}</div>
  <div>in US dolars: {{ inUSD }}</div>
  <div>
    <input type="text" v-model.number="currentBalance" />
  </div>
</template>
