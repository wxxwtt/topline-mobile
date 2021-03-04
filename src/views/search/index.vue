<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="onInput"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :value="value"
      ref="search-result"
      />
    <!-- 联想输入 -->
    <search-suggestion
      v-else-if="value.length"
      :value="value"
      :suggestion="suggestion"
      @clickSearchText="clickSearchText"
      />
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-records="searchRecords"
      @clearSearchRecords="clearSearchRecords"
      @clickSearchText="clickSearchText"
      />
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import SearchHistory from './components/search-history'
import { getrSearchSuggestion } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'

export default {
  name: '',
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  props: {},
  data () {
    return {
      value: '',
      isResultShow: false,
      suggestion: [], // 联想输入结果
      searchRecords: getItem('searchRecords') || [] // 搜索历史
    }
  },
  computed: {},
  watch: {
    searchRecords (val) {
      setItem('searchRecords', val)
    }
  },
  created () {

  },
  mounted () {},
  methods: {
    onSearch () {
      // 搜索
      if (!this.value.length) {
        return
      }
      this.isResultShow = true
      this.$nextTick(() => {
        this.$refs['search-result'].onLoad(true)
      })
      this.setSearchRecords()
    },
    onCancel () {
      // Toast('取消')
      this.$router.back()
    },
    onInput: debounce(async function () {
      // 获取搜索联想
      try {
        const { data } = await getrSearchSuggestion(this.value)
        if (data.message === 'OK') {
          this.suggestion = data.data.options
        }
      } catch (error) {
        console.log(error)
      }
    }, 400),
    setSearchRecords () {
      // 设置搜索联想
      const searchText = this.value
      const searchRecords = this.searchRecords
      const index = searchRecords.indexOf(searchText)
      if (index !== -1) {
        searchRecords.splice(index, 1)
      }
      searchRecords.unshift(searchText)
    },
    clearSearchRecords () {
      // 情况搜索历史
      this.searchRecords = []
    },
    clickSearchText (text) {
      // 搜索联想关键词 点击
      this.value = text
      this.onSearch()
    },
    onFocus () {
      this.isResultShow = false

      if (this.value.length) {
        this.onInput()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.van-search {
  position fixed
  left 0
  top 0
  width 100%
  z-index 2
  box-shadow 1px 1px 0px #eee
}
.search-history, .search-result {
  margin-top 55px
}
</style>
