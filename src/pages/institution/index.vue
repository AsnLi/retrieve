<template>
  <div class="wrapper">
    <ul class="info-list">
      <li class="info-list-item" v-for="(info, index) in infos" :key="index">
        <img :src="defalutImg" class="info-icon">
        <div class="info-msg"> 
          <h4>{{info.title}}</h4>
          <p>发文:{{info.nums}}篇 · 学者:{{info.authors}}人</p>
        </div>
      </li>
    </ul>
     <i-load-more tip="暂无数据" :loading="false" />
  </div>
</template>

<script>
const defalutImg = require("../../../static/images/math.jpg")
import {infos} from '@/mock/data'
export default {
  components:{},
  props:{},
  data(){
    return {
      infos,
      defalutImg
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){
    wx.setNavigationBarTitle({
      title: this.$root.$mp.query.institution 
    })
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  background-color white
  .info-list
    padding 15px
    &-item
      padding-bottom 15px
      margin-top 15px
      display flex
      .info-icon
        width 50px
        height 50px
      .info-msg
        margin-left 10px
        line-height 1.5
        border-bottom 1px solid #ccc
        flex 1
        p
          color #ccc
        h4
          font-size 16px
</style>