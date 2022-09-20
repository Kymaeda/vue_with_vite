<script>
console.log('loaded normal script tag ...');
</script>

<script setup>
import { computed, toRefs } from 'vue';
// import { useStore } from 'vuex';
import { useRate } from './composable/useRate';

console.log('loaded setup script tag ...');

const CURRENCY = {
  EUR: 'euro',
  US: 'us',
};

// NOTE: defineProps
const props = defineProps(['currency', 'balance']);
// NOTE: defineEmits
const emit = defineEmits(['updated']);

// const store = useStore();
const { rate } = useRate();

// const { balance } = ref(props.balance)
const { balance } = toRefs(props);

// reactive data needs to be accessed with `.value` property
const formatted = computed(() => Number(balance.value).toFixed(2));
// const rate = computed(() => store.state.rate);

const btnClicked = () => emit('updated', 100);
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
