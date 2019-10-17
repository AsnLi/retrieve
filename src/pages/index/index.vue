<template>
  <div class="container">
    <i-tabs :current="current" @change="handleChange">
      <i-tab key="search" title="搜索"></i-tab>
      <i-tab key="senior" title="高级"></i-tab>
      <i-tab key="classify" title="分类"></i-tab>
      <i-tab key="borrow" title="借阅"></i-tab>
    </i-tabs>
    <!-- <component :is="current" /> -->
    <div v-show="current == 'search'">
      <search />
    </div>
    <div v-show="current == 'senior'">
      <senior />
    </div>
    <div v-show="current == 'classify'">
      <classify />
    </div>
    <div v-show="current == 'borrow'">
      <borrow />
    </div>
  </div>
</template>

<script>
import senior from '@/pages/index/senior'
import classify from '@/pages/index/classify'
import search from '@/pages/index/baseSearch'
import borrow from '@/pages/index/borrow'

export default {
  data () {
    return {
      current: 'search',
      userInfo: null,
      data: null
    }
  },

  components: {
    senior,
    search,
    borrow,
    classify
  },

  methods: {
    handleChange ({mp: {detail}}) {
      this.current = detail.key
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .topNav
    width 100vw
  .i-input-input
    border-bottom:1px solid #ccc;
</style>
