import { defineStore } from 'pinia'
import { userInfo as getUserInfo } from '~/api/user'

export const useUserStore = defineStore(('user'), () => {
  const address = useLocalStorage('address', '北京')

  // 登录接口信息
  const token = useLocalStorage('token', '')

  // 用户信息
  const userId = useLocalStorage('userId', '')
  const userImg = useLocalStorage('userImg', '')
  const userName = useLocalStorage('userName', '')
  const userPhone = useLocalStorage('userPhone', '')

  const userInfo = computed(() => {
    return {
      id: userId.value,
      img: userImg.value,
      name: userName.value,
      phone: userPhone.value,
    }
  })

  // 是否登录
  const isLogin = computed(() => {
    const isGetLogin = token.value
    const isGetUserInfo = userId.value && userId.value && userImg.value && userName.value && userPhone.value
    return isGetLogin && isGetUserInfo
  })

  async function changeToken(val: string) {
    token.value = val
    // 获取用户信息
    const data = await getUserInfo()
    userId.value = data.id
    userImg.value = data.img
    userName.value = data.name
    userPhone.value = data.phone
  }
  function changeAddress(val: string) {
    address.value = val
  }

  function userLoginOut() {
    token.value = ''
    userId.value = ''
    userImg.value = ''
    userName.value = ''
    userPhone.value = ''
  }
  return {
    token,
    changeToken,
    address,
    changeAddress,

    isLogin,
    userInfo,

    userLoginOut,
  }
})
