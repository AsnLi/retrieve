<template>
  <div class="wrapper">
      <div class="search-wrapper">
        <div class="search-box">
          <div class="search-curSelect" @click="toggleSelect(curSelect)">{{curSelect}}</div>
          <div class="search-inputBox">
            <input type="text" placeholder="全部文献搜索" v-model.trim="searchText" class="search-input" @focus="test"/>
            <i-icon type="delete_fill" class="clearText" @click="searchText = ''" size="20" color="#ccc" v-if="!!searchText"/>
          </div>
          <div class="search-submit" :class="{active: !!searchText}" @click="goSearch">搜索</div>
        </div>

        <down-list :list="base" @itemClick="changeSelect" ref="downlist"></down-list>

        <ul class="search-list" v-if="!!searchText">
          <li class="search-list-item"
              v-for="(item, index) in searchs"
              :key="index"
              @click="toggleType(item)">
              {{item[0]}}<span class="cur">{{searchText}}</span>{{item[1]}}
          </li>
          <p v-show="!searchs.length" class="nofound-tip">NoFound, 已为你展开模糊搜索</p>
        </ul>
      </div>
      <div v-show="isClearHistory">
        <i-panel class="cell-panel-demo" >
          <i-cell-group>
            <i-cell title=" PHP" is-link :url="'/pages/results/main?keyword='+'PHP'">
              <div slot="icon">
                  <i-icon type="document" size="20" color="#ccc"/>
                  <span style="color: #ccc"> 篇名 </span>
              </div>
            </i-cell>
            <i-cell title=" Web" is-link url="/pages/results/main">
            <div slot="icon">
                  <i-icon type="createtask" size="20" color="#ccc"/>
                  <span style="color: #ccc"> 篇名 </span>
              </div>
            </i-cell>
          </i-cell-group>
          <div class="clearHistory" @click="isClearHistory = false">清空搜索历史记录</div>
        </i-panel>
      </div>
      <i-toast id="toast" />
  </div>
</template>

<script>
const { $Toast } = require('./toast.js');
import {base, searchs} from '@/mock/data'
import downList from '@/components/downList'
import { setTimeout } from 'timers';
export default {
  components:{
    'down-list': downList
  },
  props:{},
  data(){
    return {
      base,
      searchs: [],
      curSelect: '主题',
      searchText: '',
      isClearHistory: true
    }
  },
  watch:{
    searchText(val){
      if (!val) return;
      this.searchs = searchs.filter( v => v.indexOf(val) != -1).map( v => v.split(val))
    }
  },
  computed:{},
  methods:{
    test(){
      this.$refs.downlist.toggleModel(false);
    },
    goSearch(){
      $Toast({
        content: '搜索内容不能为空'
      });
      setTimeout(() => {
        wx.navigateTo({
          url: "/pages/results/main"
        });
      }, 1500)
    },
    toggleSelect(sCur){
      this.$refs.downlist.toggleModel(true);
      this.$refs.downlist.toggleDown(sCur);
    },
    changeSelect(val){
      this.curSelect = val
    },
    toggleType(item){
      wx.navigateTo({
        url: "/pages/results/main"
      });
    }
  },
  created(){},
  mounted(){}
}
</script>

<style lang="stylus" scoped>
@import '../../../stylus/colors';
.active
  background-color #2d8cf0 !important
  color white
.wrapper
  .search-wrapper
    position relative
    font-size 15px
    .search-list
      position absolute
      width 100vw
      height 100vh
      z-index 5
      background-color white
      font-size 15px
      &-item
        padding-top 15rpx
        padding-bottom 15rpx
        border-bottom 1rpx solid #F5F6F7
        background-color white
        color black
        text-indent:1em;
      .cur
        color #2d8cf0
      .nofound-tip
        text-align center
        height 20vh
        line-height 20vh
    .search-box
      margin: 15rpx;
      box-shadow: 0 0 3rpx 0 #ccc;
      border: 2rpx solid #DCDCDC;
      background-color white
      display flex
      flex-direction row
      align-items center
      border-radius:10rpx;
      .search-curSelect
        padding:15rpx 35rpx;
        position relative
        &::after
          content ''
          position absolute
          bottom 5rpx
          right 0
          border-width: 13rpx 13rpx 0;
          border-style: solid;
          border-color:#333 transparent transparent;
          transform: rotate(-45deg);
      .search-inputBox
        position relative
        flex 1
        margin-left:15rpx;
        .clearText
          position:absolute;
          right :3%;
          top:0;
          transform:translateY(12%);
          z-index 10;
      .search-submit
        padding:15rpx 20rpx;
        background-color #F5F6F7
        border-1px(#F5F6F7)
  .clearHistory
    c-blue()
    text-align center
    padding-top 20rpx
    padding-bottom 20rpx
    background-color white
    width 100vw
</style>
