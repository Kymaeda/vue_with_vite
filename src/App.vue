<script>
import { ref, computed } from 'vue';
const START_FROM = 10;
export default {
  // NOTE: OptionalAPI syntax
  // data() {
  //   return { counter: 0 }
  // }
  // computed: {
  //   muplited() { return this.counter * 10 }
  // }
  setup() {
    const counter = ref(72);
    const muplited = computed(() => counter.value * 10);
    const increment = () => counter.value++;
    // NOTE: setup() needs to return values
    return { counter, muplited, START_FROM, increment };
  },
};
</script>

<template>
  <div>Hello! {{ counter }}</div>
  <button @click="increment">Increase</button>
</template>
