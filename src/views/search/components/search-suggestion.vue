<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestion"
      :key="index"
      icon="search"
      @click="onClick(item)"
      >
        <template #title>
          <span v-html="hightStr(item)"></span>
        </template>

      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    suggestion: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: String
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    hightStr (str) {
      return str.toLocaleLowerCase().replace(this.value.toLocaleLowerCase(), `<span class="hight">${this.value}</span>`)
    },
    onClick (text) {
      this.$emit('clickSearchText', text)
    }
  }
}
</script>

<style scoped lang="stylus">
>>> .hight {
  color: red;
}
</style>
