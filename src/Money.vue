<script>
const CURRENCY = {
  EUR: 'euro',
  US: 'us',
};
export default {
  props: ['currency', 'balance'],

  setup(props) {
    console.log(props);
    return { CURRENCY };
  },
};
</script>

<template>
  <div>Cash in {{ currency }}: {{ balance }}: {{ CURRENCY[currency] }}</div>
</template>
