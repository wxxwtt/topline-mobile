<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="$store.state.userInfo">
      <van-cell class="base-info" center :border="false">
        <van-image class="avatar" :src="user.photo" slot="icon" round fit="cover" />
        <div class="name" slot="title">{{ user.name }}</div>
        <van-button class="update-btn" size="small" round to="/user/profile">编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ user.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ user.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ user.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ user.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group >

    <div class="not-login" v-else>
      <div
        @click="$router.push({
        name: 'login',
        query: {
          redirect: '/my'
        }
      })"
      >
        <img class="mobile" src="~@/assets/images/mobile.png" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="3"  v-if="$store.state.userInfo">
      <van-grid-item class="nav-grid-item" text="收藏">
        <van-icon slot="icon" name="star-o" />
      </van-grid-item>
      <van-grid-item class="nav-grid-item" text="历史">
         <van-icon slot="icon" name="browsing-history-o" />
      </van-grid-item>
       <van-grid-item class="nav-grid-item" text="作品">
         <van-icon slot="icon" name="edit" />
       </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link to="/"  v-if="$store.state.userInfo" />
    <van-cell class="mb-4" title="小智同学" is-link to="/user/chat"  v-if="$store.state.userInfo" />
    <van-cell class="logout-cell" title="退出登录" @click="logout" v-if="$store.state.userInfo" />
  </div>
</template>

<script>
import { getUser } from '@/api/user'
export default {
  name: 'MyPage',
  components: {},
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () { },
  methods: {
    async loadUser () {
      try {
        const { data } = await getUser()
        this.user = data.data
      } catch (error) {
        console.log(error)
      }
    },
    logout () {
      this.$store.commit({
        type: 'updatedUser',
        userInfo: null
      })
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>

<style lang='stylus' scoped>
.my-container
  .my-info
    background url('~@/assets/images/banner.png') no-repeat
    background-size cover
    .base-info
      box-sizing border-box
      height 115px
      background-color unset
      padding-top 38px
      padding-bottom 11px
      .avatar
        box-sizing border-box
        width 66px
        height 66px
        border 1px solid #fff
        margin-right 11px
      .name
        font-size 15px
        color #fff
      .update-btn
        font-size 10px
        color #666666
    .data-info
      .data-info-item
        height 65px
        color #fff
        .text-wrap
          display flex
          flex-direction column
          justify-content center
          align-items center
          .count
            font-size 18px
          .text
            font-size 11px
    >>> .van-grid-item__content
      background-color unset
  .not-login
    height 180px
    background url('~@/assets/images/banner.png') no-repeat
    background-size cover
    display flex
    flex-direction column
    justify-content center
    align-items center
    .mobile
      width 66px
      height 66px
    .text
      font-size 14px
      color #fff
  >>> .nav-grid
    .nav-grid-item
      height 70px
      .toutiao
        font-size 22px
      .toutiao-shoucang
        color #eb5253
      .toutiao-lishi
        color #ff9d1d
      .van-grid-item__text
        font-size 14px
        color #333333
  .logout-cell
    text-align center
    color #d86262
  .mb-4
    margin-bottom 4px
</style>
