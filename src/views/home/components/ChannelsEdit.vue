<template>
  <div>
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border="false">
      <van-button plain type="primary" round size="small" @click="isEditShow = !isEditShow">{{ isEditShow ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        :class="{active: value === index}"
        v-for="(item, index) in userChannels"
        :key="item.id"
        :text="item.name"
        clickable
        @click="userChannelsClick(item,index)">
        <van-icon v-show="isEditShow && index !== 0" class="close-icon" slot="icon" name="close" />
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item v-for="item in remainingChannels" :key="item.id" :text="item.name" @click="addChannle(item)" clickable />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannels, deleteChannels } from '@/api/user'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelsEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: { // 默认激活
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false // 编辑按钮状态
    }
  },
  computed: {
    remainingChannels () {
      const channels = []
      this.allChannels.forEach(item => {
        const result = this.userChannels.find(channel => channel.id === item.id)
        if (!result) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () { },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    async addChannle (channel) {
      try {
        await addChannels([{ seq: this.userChannels.length + 1, id: channel.id }])
        this.userChannels.push(channel)
        setItem('userChannels', this.userChannels)
      } catch (error) {
        console.log(error)
      }
    },
    async userChannelsClick (channel, index) {
      // 有编辑状态时 可以进行删除  否则跳转到对应频道
      if (this.isEditShow) {
        if (index !== 0) {
          try {
            await deleteChannels(channel.id)
            this.userChannels.splice(index, 1)
            setItem('userChannels', this.userChannels)
          } catch (error) {

          }
        }
      } else {
        this.$emit('input', index)
        this.$emit('onClose')
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
>>> .van-cell__title
  font-size 16px
>>> .van-grid-item__content
  background #f3f4f5
>>> .van-grid-item__icon-wrapper
  position absolute
  top -8px
  right -5px
  font-size 18px
>>> .van-grid-item.active .van-grid-item__text {
    color #ee0a24
  }
</style>
