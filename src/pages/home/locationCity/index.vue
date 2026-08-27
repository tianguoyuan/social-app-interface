<script setup lang="ts" name="/locationCity/">
import to from 'await-to-js'
import Fuse from 'fuse.js'
import { showToast } from 'vant'
import sortCity from '~/utils/sortCity.json'
// import { getPosition } from '~/utils'
import { ZIndexEnum } from '~/enums/ZIndexEnum'
import { citySearch, mapPositionById } from '~/utils/amap'

const router = useRouter()
const appStore = useAppStore()

function back() {
  router.replace(appStore.prePath || '/home')
}

const searchMsg = ref('')

const userStore = useUserStore()
function handleClickCell(v: string) {
  userStore.changeAddress(v)
  back()
}

const currentPosition = ref(userStore.address)
watch(() => userStore.address, (v) => {
  currentPosition.value = v
})

async function handleClickPosition() {
  currentPosition.value = '获取中...'

  const [err, position] = await to(citySearch())
  if (err) {
    currentPosition.value = '获取失败'
    showToast('获取定位失败')
  }
  else {
    currentPosition.value = position.province === position.city ? position.city : `${position.province}_${position.city}`
  }
  // const [err, position] = await to(getPosition())
  // if (err) {
  //   currentPosition.value = '获取失败'
  //   showToast('获取定位失败')
  // }
  // else {
  //   currentPosition.value = `${position.latitude},${position.longitude}`
  // }
}
const fuse = new Fuse(sortCity.city, {
  keys: ['lists'],
  includeMatches: true,
})

const city = ref(sortCity.city)
const getDebounceCity = useDebounceFn(() => {
  if (searchMsg.value) {
    const result = fuse.search(searchMsg.value).map(item => item.item)

    city.value = result
  }
  else {
    city.value = sortCity.city
  }
}, 1000)
const indexList = computed(() => city.value.map(item => item.title))
watch(searchMsg, getDebounceCity)

const isMap = ref(false)
const rightBtnText = computed(() => isMap.value ? '手动选择' : '切换地图')
watch(isMap, (v) => {
  if (v)
    nextTick(() => mapPositionById('amapLocationCity'))
})
</script>

<template>
  <div class="flex flex-1 flex-col bg-[#F6F8FA]">
    <van-nav-bar title="选择城市" placeholder fixed :z-index="ZIndexEnum.HOME_NAVBAR">
      <template #left>
        <van-icon name="arrow-left" color="#0B1526" @click="back" />
      </template>

      <template #right>
        <span class="text-xs" @click="isMap = !isMap">{{ rightBtnText }}</span>
      </template>
    </van-nav-bar>
    <div v-if="!isMap">
      <div class="bg-white">
        <div class="bg-[#b1b4c3]">
          <van-search
            v-model="searchMsg"
            placeholder="请输入城市名称"
            input-align="center"
          />
        </div>

        <div class="flex justify-between px-4 pb-3 text-3" @click="handleClickPosition">
          <span class="color-[#B1B4C3]">当前定位</span>
          <div>
            <van-icon name="location-o" />
            <span>{{ currentPosition }}</span>
          </div>
        </div>
      </div>

      <van-index-bar :index-list="indexList" :sticky-offset-top="46">
        <template v-for="item in city" :key="item.title">
          <van-index-anchor :index="item.title" />
          <van-cell v-for="v in item.lists" :key="v" :title="v" @click="handleClickCell(v)" />
        </template>
      </van-index-bar>
    </div>
    <div v-else id="amapLocationCity" class="flex-1" />
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.van-index-anchor) {
  color: #b1b4c3;
  line-height: 21px;
  font-size: 12px;
}
::v-deep(.van-index-anchor--sticky) {
  color: #1989fa;
}
</style>

<route lang="yaml">
  meta:
    title: 定位城市
</route>
