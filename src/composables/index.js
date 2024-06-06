import { ref } from 'vue'
export const useGuessList = () => {
  //获取猜你喜欢组件实例
  const guessRef = ref()
  // 滚动触底事件
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }
  // 返回 ref 和事件处理函数
  return { guessRef, onScrolltolower }
}
