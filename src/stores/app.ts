import { defineStore } from 'pinia'

export const useAppStore = defineStore(('app'), () => {
  const prePath = ref('/home')

  function changePrePath(val: string) {
    prePath.value = val
  }
  return {
    prePath,
    changePrePath,
  }
})
