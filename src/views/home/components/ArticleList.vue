<template>
  <div class="articles">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item,index) in articles"
          :key="index"
          :title="item.title"
          @click="$router.push({ name: 'article', params: { articleId: item.art_id } })"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      refreshing: false,
      pre_timestamp: null
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticlesByChannel({
          channel_id: this.channel.id,
          timestamp: this.pre_timestamp || new Date().getTime(),
          with_top: 1
        })

        this.loading = false
        this.pre_timestamp = data.data.pre_timestamp
        const { results } = data.data
        this.articles.push(...results)

        if (!results.length) {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticlesByChannel({
          channel_id: this.channel.id,
          timestamp: new Date().getTime(),
          with_top: 1
        })

        this.refreshing = false
        this.pre_timestamp = data.data.pre_timestamp
        const { results } = data.data
        this.articles.unshift(...results)
        this.$toast('更新成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.articles
  margin-bottom 1.333333rem /* 50/37.5 */
  margin-top 2.666667rem /* 100/37.5 */
</style>
