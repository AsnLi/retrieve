<template>
  <div class="content">
      <ul class="article-list">
        <li class="article-list-item" @click="watchDetail(index)" v-for="(articleItem, index) in list" :key="articleItem.FileName">
          <div class="article-title">
            {{articleItem.TitleName}}
          </div>
          <div class="article-authors">{{articleItem.AuthorString}}</div>
          <div class="article-abstract">
           {{articleItem.Abstract}}
          </div>
          <div class="article-source">
           {{articleItem.Source}}
          </div>
          <div class="article-related">
            <div class="article-quote">
              <span>下载：{{articleItem.DownloadCount}} </span>
              <span>被引：{{articleItem.QueryId}}</span>
            </div>
            <div class="article-tips">
              <i-tag class="i-tags" name="单个标签" color="red"> 优先</i-tag>
              <i-tag class="i-tags" name="单个标签" color="red"> 核心</i-tag>
            </div>
          </div>
        </li>
      </ul>
      <i-load-more tip="暂无数据" :loading="false" />
    </div>
</template>

<script>
export default {
  components:{},
  props:{
    list: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
     watchDetail(index){
      wx.navigateTo({
        url: "/pages/details/main?index=" + index
      });
    }
  },
  created(){},
  mounted(){}
}
</script>

<style lang="stylus" scoped>
@import '../stylus/colors';
@import '../stylus/mixin';
.content
  background-color white
  padding 15rpx
  .article-list
    .article-list-item
      padding-bottom:15rpx;
      border-bottom:1rpx solid #f5f6f7;
      margin-top:15rpx;
      div
        margin-bottom 8rpx
      .article-title
        font-size:17px;
        font-weight:bold;
        c-a()
      .article-authors
        c-sub()
      .article-abstract
        line-height:1.4;
        font-size:15px;
        c-title()
        no-wrap-more(3)
      .article-source
        c-green()
      .article-related
        display:flex;
        justify-content:space-between;
        .article-quote
          c-sub()
</style>