import { readonly, ref } from 'vue';

const rate = ref(1.14);

export function useRate() {
  const setRate = (newRate) => rate.value = newRate

  return {
    rate: readonly(rate),
    setRate
  }
}
