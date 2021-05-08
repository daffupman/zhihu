<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import {useRoute} from 'vue-router'
import {testData, testPosts} from '@/store/index.ts'
import PostList from '@/views/PostList.vue'
import store from "@/store";

export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList
  },
  setup() {
    const route = useRoute()
    // 使用 + 可以把字符串类型的转成数字类型的
    const currentId = +route.params.id;
    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostsByCid(currentId))

    return {
      column,
      list,
    }
  }
})
</script>

<style scoped>

</style>