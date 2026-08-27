<script setup lang="ts">
const tabbarList = [
  {
    url: '/home',
    title: '首页',
    icon: 'home-o',
  },
  {
    url: '/community',
    title: '社区',
    icon: 'cluster-o',
  },
  {
    url: '/add',
    icon: 'add',
  },
  {
    url: '/message',
    title: '消息',
    icon: 'chat-o',
  },
  {
    url: '/personal',
    title: '个人',
    icon: 'manager-o',
  },
]

const route = useRoute()
const router = useRouter()

const activeIndex = computed(() => {
  return tabbarList.findIndex(v => v.url === route.path) || 0
})
function toPath(url: string) {
  router.push(url)
}

const cacheViews = computed(() => router.getRoutes().filter(route => !route.meta.noCache && route.name).map(v => v.name as string))
// eslint-disable-next-line no-console
console.log('routeName', cacheViews.value)
</script>

<template>
  <!-- 回到顶部 -->
  <van-back-top bottom="15vh" target="#layoutDefaultContainer" />
  <div id="layoutDefault" class="flex flex-col">
    <!-- 内容展示 -->
    <div id="layoutDefaultContainer" class="flex flex-1 flex-col overflow-auto">
      <RouterView v-slot="{ Component, route: currentRoute }">
        <Transition
          name="fade-transform"
          mode="out-in"
        >
          <KeepAlive :include="cacheViews">
            <component
              :is="Component"
              :key="currentRoute.fullPath"
            />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>

    <!-- 首页 底部选项卡 -->
    <div class="tabbar">
      <VanTabbar v-if="route.meta.showTabBar" :model-value="activeIndex" safe-area-inset-bottom placeholder :fixed="false">
        <VanTabbarItem v-for="(item) in tabbarList" :key="item.url" :icon="item.icon" class="transition-all" @click="toPath(item.url)">
          <template v-if="item.title">
            {{ item.title }}
          </template>
          <template v-if="!item.title" #icon="props">
            <VanIcon :name="item.icon" size="50" :color="props.active ? '#1989fa' : '#7d7e80'" />
          </template>
        </VanTabbarItem>
      </VanTabbar>
    </div>
  </div>
</template>

<style lang="scss">
#layoutDefault {
  height: 100vh;
}

/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
  #layoutDefault {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
}
</style>
