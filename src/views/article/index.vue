<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
          <van-button
            round
            size="small"
            :type="article.is_followed ? 'default' : 'info' "
            @click="onFollow"
            >
              {{ article.is_followed ? '已关注' : '+ 关注' }}
            </van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    <ArticleComment></ArticleComment>

    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        color="#777"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#777"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import ArticleComment from './components/article-comment'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike,
  addFollow,
  deleteFollow
} from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleComment
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false,
      article: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true
      })
      // 收藏
      try {
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$toast.clear()
        this.article.is_collected = !this.article.is_collected
      } catch (error) {
        this.$toast.clear()
      }
    },
    async onLike () {
      // 点赞相关操作
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true
      })
      try {
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
        } else {
          await addLike(this.articleId)
          this.article.attitude = 1
        }
        this.$toast.clear()
      } catch (error) {
        this.$toast.clear()
      }
    },
    async onFollow () {
      // 关注相关操作
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true
      })
      try {
        if (this.article.is_followed) {
          await deleteFollow(this.article.aut_id)
        } else {
          await addFollow(this.article.aut_id)
        }
        this.article.is_followed = !this.article.is_followed
        this.$toast.clear()
      } catch (error) {
        this.$toast.clear()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import './github-markdown.css'
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 48px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 16px;
      padding: 10px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 10px;
      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 14px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 13px;
        color: #b7b7b7;
      }
      .follow-btn {
        // width: 80px;
        // height: 36px;
      }
    }

    .article-content {
      padding: 10px;
      >>> p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 80px;
      color: #b4b4b4;
    }
    .text {
      font-size: 20px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 50%;
      height: 50px;
      line-height: 50px;
      border: 1px solid #c3c3c3;
      font-size: 18px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
  >>> .van-nav-bar .van-icon {
    color: #fff;
  }
}

</style>
