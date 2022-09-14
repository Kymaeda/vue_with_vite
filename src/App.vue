<script>
import { ref, computed, reactive } from 'vue';
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
    // NOTE: `ref` works with Object and Primitive(wrapped with Object inside `ref` func), and call `reactive` internally
    const counter = ref(72);
    // NOTE: `reactive` works with only Object. Primitive is not acceptable
    const tokyo = reactive({ counter: 10 });

    const ra = ref([1, 2, 3]);
    const replaceArray = () => (ra.value = [2, 4, 6]);

    const muplited = computed(() => counter.value * 10);
    const increment = () => counter.value++;
    // NOTE: setup() needs to return values
    return {
      START_FROM,
      counter,
      tokyo,
      ra,
      replaceArray,
      muplited,
      increment,
    };
  },
};
</script>

<template>
  <div>Hello! {{ counter }}</div>
  <button @click="increment">Increase</button>

  <button @click="replaceArray">Replace</button>
  <div>{{ ra }}</div>

  <div>{{ tokyo.counter }}</div>
</template>
