<template>
  <div>
    <van-nav-bar title="登录" />
    <ValidationObserver ref="loginFrom">
      <ValidationProvider name="手机号" rules="required|mobile">
        <van-field
          v-model="user.mobile"
          type="number"
          label="手机号"
          left-icon="smile-o"
          placeholder="请输入手机号"
        />
      </ValidationProvider>

      <ValidationProvider name="验证码" type="number" rules="required|code">
        <van-field
          v-model="user.code"
          clearable
          label="验证码"
          left-icon="music-o"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button v-if="!countDownFlag" size="small" type="primary" @click="onSendSMS">发送验证码</van-button>
            <van-count-down v-else :time="time" format="ss 秒" @finish="finish" />
          </template>
        </van-field>
      </ValidationProvider>

      <div class="login-btn">
        <van-button type="info" block @click="onLogin">登录</van-button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { login, sendSMS } from '@/api/user'
import { validate } from 'vee-validate'
export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    return {
      time: 60 * 1000,
      countDownFlag: false,
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () { },
  methods: {
    finish () {
      this.countDownFlag = false
    },
    async onLogin () {
      const validateResult = await this.$refs.loginFrom.validate()
      if (!validateResult) {
        setTimeout(() => {
          const { errors } = this.$refs.loginFrom
          const error = Object.values(errors).find(item => item[0])
          this.$toast(error[0])
        }, 100)
        return
      }
      const user = this.user
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '正在登陆'
        })
        const { data } = await login(user)
        this.$toast.success('登录成功')
        this.$store.commit({
          type: 'updatedUser',
          userInfo: data.data
        })
      } catch (error) {
        this.$toast.fail('登录失败')
      }
    },
    async onSendSMS () {
      // 验证手机号
      const { mobile } = this.user
      const { valid, errors } = await validate(mobile, 'required|mobile', {
        name: '手机号'

      })
      if (!valid) {
        this.$toast(errors[0])
        return
      }
      await sendSMS(this.user.mobile)
      this.countDownFlag = true
    }
  }
}
</script>

<style lang='stylus' scoped>
.login-btn
  background-color $color-primary
  padding 0 20px
  margin-top 50px
.van-button
  background-color $color-primary
</style>
