<script>
import { computed, toRefs } from 'vue';

const CURRENCY = {
  EUR: 'euro',
  US: 'us',
};
export default {
  props: ['currency', 'balance'],

  setup(props) {
    console.log(props);
    // const { balance } = ref(props.balance)
    const { balance } = toRefs(props);
    // reactive data needs to be accessed with `.value` property
    const formatted = computed(() => Number(balance.value).toFixed(2));
    return { CURRENCY, formatted };
  },
};
</script>

<template>
  <div>
    Cash in {{ currency }}: {{ balance }}: {{ CURRENCY[currency] }}
    {{ formatted }}
  </div>
</template>
