<script>
import { computed, toRefs } from 'vue';
// import { useStore } from 'vuex';
import { useRate } from './composable/useRate';

const CURRENCY = {
  EUR: 'euro',
  US: 'us',
};
export default {
  props: ['currency', 'balance'],
  emits: ['updated'],

  setup(props, { emit }) {
    console.log(props);
    // const store = useStore();
    const { rate } = useRate();

    // const { balance } = ref(props.balance)
    const { balance } = toRefs(props);

    // reactive data needs to be accessed with `.value` property
    const formatted = computed(() => Number(balance.value).toFixed(2));
    // const rate = computed(() => store.state.rate);

    const btnClicked = () => emit('updated', 100);

    return { CURRENCY, formatted, btnClicked, rate };
  },
};
</script>

<template>
  <div>
    Cash in {{ currency }}: {{ balance }}: {{ CURRENCY[currency] }}
    {{ formatted }}
    <div>
      <small>Current Rate: {{ rate }}</small>
    </div>
    <div>
      <button @click="btnClicked">emit</button>
    </div>
  </div>
</template>
