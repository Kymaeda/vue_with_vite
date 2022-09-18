<script>
import { ref, computed, reactive, watch, onMounted } from 'vue';
import Money from './Money.vue';

let timeout = null;

export default {
  components: { Money },
  setup() {
    const currentBalance = ref(0);
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

    const rate = ref(1.14)
    onMounted(
      () => setInterval(
        () => rate.value = [1.13, 1.14, 1.15][Math.floor(Math.random() * 3)],
        1000,
      )
    )

    return { currentBalance, inUSD, sessionCounter, history, exchangeRecords };
  },
};
</script>

<template>
  <Money :currency="`EUR`" :balance="currentBalance" />
  <Money :currency="`US`" :balance="inUSD" />
  <div>
    <input type="text" v-model.number="currentBalance" />
  </div>
</template>
