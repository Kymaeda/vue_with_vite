import { ref } from 'vue';

export function useRate() {
  const rate = ref(1.14)
  const setRate = (newRate) => rate.value = newRate

  return { rate, setRate }
}
