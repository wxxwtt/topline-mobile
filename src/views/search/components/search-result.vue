<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false">
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        @click="$router.push({ name: 'article', params: { articleId: item.art_id } })"
         />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      list: []
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad (resetList = false) {
      if (resetList) {
        this.loading = true
        this.page = 1
        this.list = []
      }
      const { value, page, per_page: perPage } = this
      // Toast(val)
      try {
        const { data } = await getSearch({
          q: value,
          page,
          per_page: perPage
        })
        const results = data.data.results
        this.list.push(...results)
        this.loading = false
        if (!results.length) {
          this.finished = true
        } else {
          this.page++
        }
      } catch (error) {
        console.log(error)
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>
