<template>
  <div class="wrapper">
    <ul class="side-navList">
      <li v-for="(item, index) in sideList" 
          :key="index" 
          :class="{active: index == active}"
          @click="toggleSubList(index)">{{item.title}}</li>
    </ul>
    <ul class="menu-list">
      <li v-for="(subItem, index) in list" :key="index" @click="watchDetail(subItem)">
        <i-icon type="barrage" size="20" class="icon"/>{{ subItem}}</li>
    </ul>
  </div>
</template>

<script>
import {sideList} from '@/mock/data'
export default {
  components:{},
  props:{},
  data(){
    return {
      sideList,
      active: 0,
      list: []
    }
  },
  watch:{},
  computed:{},
  methods:{
    toggleSubList(nIndex){
      this.list = sideList[nIndex].list
      this.active = nIndex
    },
    watchDetail(sKeyword){
      wx.navigateTo({
        url: "/pages/classify/main?keyword=" + sKeyword
      });
    }
  },
  created(){},
  mounted(){
    this.list = sideList[this.active].list
  }
}
</script>

<style lang="stylus" scoped>
@import '../../stylus/colors';
.wrapper
  display flex
  .side-navList
    height 100vh
    background-color white
    font-weight bold
    box-shadow darkgrey 10px 10px 30px 5px
    li
      padding 15px
      border-bottom 1px solid #f5f6f7
    .active
      background-color #2d8cf0
      color white
      position relative
      &::after
        content ''
        position absolute
        top 16px
        right 0
        border-width: 8px 8px 8px 0;
        border-style: solid;
        border-color:transparent #f5f6f7 transparent transparent;
  .menu-list
    flex 1
    width 80vw
    background-color #f8f8f9
    padding 10px
    li 
      padding 15px
      margin-top 8px
      background-color white
      .icon
        margin-right 5px
        c-blue()
</style>