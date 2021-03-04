<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="!isShowDelete">
        <span class="clear-all" @click="$emit('clearSearchRecords')">全部删除</span>
        <span @click="isShowDelete = true">完成</span>
      </template>
      <van-icon name="delete" v-else @click="isShowDelete = false"/>
    </van-cell>
    <van-cell :title="item"
      v-for="(item, index) in searchRecords"
      :key="index"
      @click="onClick(item)">
      <van-icon name="close" @click="searchRecords.splice(index, 1)"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchRecords: {
      type: Array
    }
  },
  data () {
    return {
      isShowDelete: true
    }
  },
  computed: {},
  watch: {

  },
  created () {},
  mounted () {},
  methods: {
    onClick (text) {
      this.$emit('clickSearchText', text)
    }
  }
}
</script>

<style scoped lang="stylus">
.clear-all {
  margin-right 20px
}
</style>
