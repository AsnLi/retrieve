<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-main">
        <img :src="defalutImg" class="logo">
        <p class="name">电镀与涂饰(1982-2018)</p>
        <div class="header-tags">
          <i-tag class="i-tags" name="单个标签" color="red"> 优先</i-tag>
          <i-tag class="i-tags" name="单个标签" color="red"> 核心</i-tag>
        </div>
        <div class="header-setting">
          <i-icon type="collection" size="25"/>
          <i-button type="ghost" shape="circle" inline class="price" @click="goDetailView">借阅图书</i-button>
          <i-icon type="add" size="25"/>
        </div>
      </div>
       <ul class="nav-list">
        <li v-for="(item, index) in icons" :key="index">
          <i-icon :type="item.icon" size="18"/>
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
    <div class="main">
        <div class="main-search"><i-icon type="search" size="25"/>sousu</div>
        <ul class="info">
          <div class="card-tip">一 201822期 一</div>
          <li v-for="(item, index) in 4" :key="index">
            <h4>期刊信息标题占位文本期刊信息标题占位文本</h4>
            <div class="info-msg">
              <span>杨峰</span>
              <span>2018-11-30</span>
            </div>
          </li>
        </ul>
        <ul class="more">
          <div class="card-tip">一 更多往期 一</div>
          <li v-for="(item, index) in 6" :key="index">
            <img :src="defalutImg" class="logo">
            <p>电子世界</p>
          </li>
          <i-button type="ghost">查看全部往期<i-icon type="enter" size="20"/></i-button>
        </ul>
    </div>
  </div>
</template>

<script>
const defalutImg = require("../../../static/images/defalut.jpg")
const icons = [
  {title: "期刊信息",icon:"accessory"},
  {title: "发文趋势",icon:"activity"},
  {title: "发文热点",icon:"addressbook"},
  {title: "热门学者",icon:"group"},
  {title: "更多",icon:"more"}
]
export default {
  components:{},
  props:{},
  data(){
    return {
      defalutImg,
      icons
    }
  },
  watch:{},
  computed:{},
  methods:{
   goDetailView () {
      wx.navigateTo({
        url: "/pages/borrowDtas/main?isBorrow=1"
      })
    }
  },
  created(){},
  mounted(){}
}
</script>

<style lang="stylus" scoped>
.wrapper
  .logo
    width 80px
    height 100px
  .header
    text-align center
    background-color white
    .header-main
      background-color #2d8cf0
      color white
      .logo
        margin-top 10px
        margin-bottom 10px
      .name
        line-height 1.8
      .header-setting
        margin-top 10px
        padding-left 30px
        padding-right 30px
        display flex
        align-items center
        justify-content space-around
    .nav-list
      display flex
      text-align center
      padding 5px
      li
        flex 1
        p
          line-height 1.5
  .main
    margin-top 10px
    padding-left 10px
    padding-right 10px
    .main-search, ul
      margin-bottom 10px
      background-color white
      padding 10px
    .main-search
    .card-tip
      text-align center
    .card-tip
      padding-bottom 10px
      border-bottom 1px solid #ccc
    .info
      li
        border-bottom 1px solid #ccc
        padding-bottom 5px
        h4
          line-height 2
          font-size 16px
        .info-msg
          display flex
          justify-content space-between
          margin-bottom 5px
    .more li
      display inline-block
      text-align center
      margin-top 10px
      margin-bottom 10px
      width 33.333%
</style>
