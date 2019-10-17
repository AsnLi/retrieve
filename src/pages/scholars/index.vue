<template>
  <div class="wrapper">
      <div class="scholars-card">
        <div class="scholars-name">
          <span class="name">吴深</span>
          <span class="add">＋ 关注</span>
        </div>
        <div class="scholars-address">
          <p>单位: 江西信息应用技术学院</p>
          <p>领域: 互联网技术、职业教育</p>
        </div>
        <div class="scholars-related">
          <ul class="related-list">
            <li v-for="(item, index) in 4" :key="index">
              <p>0</p>
              <p>H指数</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="scholars-article">
        <div class="view-header">
          <span class="close">近五年发文量趋势</span>
          <span class="details">详情<i-icon type="enter" size="20" /></span>
        </div>
        <div class="view-box">
          Echars实例图
        </div>
      </div>
      <div class="scholars-info">
        <i-tabs :current="current" @change="tabsChange">
          <i-tab key="search" title="研究成果"></i-tab>
          <i-tab key="senior" title="合作学者"></i-tab>
        </i-tabs>
        <div v-show="current == 'search'">
            <articleList :list="recommendInfo"></articleList>
        </div>
        <div v-show="current == 'senior'">
            <i-load-more tip="暂无数据" :loading="false" />
        </div>
      </div>
  </div>
</template>

<script>
import  articleList from '@/components/articleList'
const { recommendInfo } = require("@/mock/apiCopy")
export default {
  components:{
    articleList
  },
  props:{},
  data(){
    return {
      current: 'search',
      recommendInfo
    }
  },
  watch:{},
  computed:{},
  methods:{
    tabsChange ({mp: {detail}}) {
      this.current = detail.key
    },
  },
  created(){},
  mounted(){}
}
</script>

<style lang="stylus" scoped>
.wrapper
  .scholars-card
    background-color #bbd5f7
    margin 10px
    margin-bottom 30px
    padding 15px 10px
    position relative
    .scholars-name
      display flex
      justify-content space-between
      margin-bottom 10px
      .name
        font-size 17px
        font-weight bold
      .add
        color orange
    .scholars-address
      line-height 2
      color #80848f
      margin-bottom 20px
    .scholars-related
      background-color #2d8cf0
      position:absolute;
      bottom:-10px;
      width:95%;
      border-top-left-radius 10px
      border-top-right-radius 10px
      .related-list
        display flex
        color white
        text-align center
        li
          flex 1
          border-right 1px solid white
          &:last-child
            border-right none
  .scholars-article
    background-color white
    margin-bottom 10px
    .view-header
      padding-top 10px
      padding-bottom 10px
      border-bottom 1px solid #F5F6F7
      display flex
      justify-content space-between
      .close
        margin-left 10px
      .details
        margin-right 10px
        color #2d8cf0
    .view-box
      height 20vh
      padding 15px
      line-height 20vh
      text-align center
</style>