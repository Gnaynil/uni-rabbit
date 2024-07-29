import { defineStore } from "pinia";
import {ref} from 'vue'
export const useAddressStore = defineStore('address',()=>{
  const selectedAddress = ref()
  const changeSelectedAddress = (val)=>{
    selectedAddress.value = val
  }
  return {selectedAddress,changeSelectedAddress}
})
