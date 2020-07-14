<template>
  <div class="nav">
    <van-nav-bar title="首页" fixed :border="false"/>
    <van-tabs v-model="active">
      <van-icon class="menu" name="bars"  @click="isEditChannels = true" />

      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>
    <!-- 编辑频道 -->
    <van-action-sheet v-model="isEditChannels" title="频道管理">
      <channels-edit  :userChannels="channels"></channels-edit>
    </van-action-sheet>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/ArticleList'
import ChannelsEdit from './components/ChannelsEdit'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelsEdit
  },
  props: {},
  data () {
    return {
      active: '0',
      channels: [], // 频道
      isEditChannels: false // 编辑显示状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {

  },
  methods: {
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.nav >>> .van-tabs__wrap
  position fixed
  top  46px
  left 0
  width 100%
  z-index 100
  padding-right 50px
  .van-tabs__nav
    margin-right 40px
.menu
  line-height 44px
  padding 0 10px
  position fixed
  right 0
  top 46px
  z-index 999
  box-shadow -1px 0px 2px #e8e8e8
  background #fff
.van-action-sheet {
  max-height 100%
}
</style>
