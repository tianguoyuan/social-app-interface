<script setup lang="ts" name="/add/">
import { showToast } from 'vant'
import { addCommunity, addLocation, addTag } from '~/assets/images'

const pageFlag = ref<'add' | 'selectPhoto'>('add')

const title = ref('')
const desc = ref('')

function handleClickHelp() {
  showToast('发布帖子')
}

// 添加标签列表
const tagSelectList = [
  { id: 1, img: addTag, name: '添加标签', desc: '请选择标签' },
  { id: 2, img: addLocation, name: '所在位置', desc: '请选择位置' },
  { id: 3, img: addCommunity, name: '添加社区', desc: '请选择社区' },
]

// 上传文件列表
const fileList = ref([])

const router = useRouter()
function submit() {
  showToast('发布帖子成功')
  router.replace('/home')
}
</script>

<template>
  <div id="PageAdd" class="flex flex-1 bg-white">
    <div v-show="pageFlag === 'add'">
      <van-nav-bar placeholder fixed title="发布帖子">
        <template #left>
          <RouterLink replace to="/home">
            <van-icon name="arrow-left" color="#0B1526" />
          </RouterLink>
        </template>
        <template #right>
          <van-icon name="question-o" color="#B1B4C3" @click="handleClickHelp" />
        </template>
      </van-nav-bar>
      <div class="p-4">
        <div>
          <van-field v-model="title" type="text" placeholder="填写标题" class="articleTitle" />
        </div>
        <div class="mt-6">
          <van-field
            v-model="desc"
            rows="3"
            autosize
            type="textarea" placeholder="添加正文"
            class="text-4 placeholder-text-4 placeholder-[#B1B4C3]"
          />
        </div>

        <!-- 话题标签 -->
        <div class="mt-4 flex flex-wrap">
          <span v-for="(_, index) in 10" :key="index" class="m-1 flex-shrink-0 rounded-1 bg-[#F4F0FF] px-[6px] py-1 text-3 color-[#5F2AFF]"># 话题</span>
        </div>

        <!-- 上传图片 -->
        <div class="mt-4">
          <div>
            <van-uploader v-model="fileList" preview-size="104" multiple :max-count="9" />
          </div>
          <p class="mt-3 text-3 color-[#B1B4C3]">
            长按可拖动排序, 第一张图为封面图 (限9张)
          </p>
        </div>

        <!-- 添加标签 -->
        <div>
          <div v-for="(item) in tagSelectList" :key="item.id" class="flex justify-between py-3">
            <div class="flex items-center color-[#5D667B]">
              <van-image
                class="h-4"
                :src="item.img"
                lazy-load
              />

              <span class="pl-1">{{ item.name }}</span>
            </div>
            <div class="flex items-center color-[#B1B4C3]">
              <span>{{ item.desc }}</span>
              <van-icon name="arrow" class="h-[10px] pl-1" />
            </div>
          </div>
        </div>

        <div class="my-9 block h-10 flex items-center justify-center btn" @click="submit">
          发布帖子
        </div>
      </div>
    </div>
    <div v-show="pageFlag === 'selectPhoto'">
      <div>selectPhoto</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#PageAdd {
  ::v-deep(.van-cell.van-field) {
    padding: 0;
  }
  // class="text-5 placeholder-text-5 placeholder-[#B1B4C3]"
  .articleTitle {
    ::v-deep(input) {
      font-size: 20px;
      &::placeholder {
        font-size: 20px;
        color: #b1b4c3;
      }
    }
  }
}
</style>

<route lang="yaml">
  meta:
    title: 发布帖子
</route>
