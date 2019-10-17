<template>
  <div class="wrapper">
    <div class="header-nav">
      <div class="header-nav-list">
        <div v-for="(item, index) in navs" :key="index" @click="toggleSelect(item, index)">
          {{item.title}} <span class="arrow" :class="{anima:index == curIndex}"></span>
        </div>
        <div class="more" @click="showRightDrawer"><i-icon type="return" /></div>
      </div>
      <down-list :list="selects" @itemClick="changeSelect" ref="downlist"></down-list>
    </div>
    <div class="content">
      <ul class="article-list">
        <li class="article-list-item" @click="watchDetail(articleItem.code)" v-for="(articleItem, index) in articlelist" :key="articleItem.code">
          <div class="article-title">
            {{articleItem.title[0]}}
            <span style="color: red" v-if="articleItem.title.length > 1">{{keyword}}</span>
            {{articleItem.title[1]}}
          </div>
          <div class="article-authors">{{articleItem.author}}</div>
          <div class="article-abstract">
            <span v-for="(chunk, key) in articleItem.abstract" :key="key">
              {{chunk}}<span style="color: red" v-if="key != articleItem.abstract.length - 1">{{keyword}}</span>
            </span>
          </div>
          <div class="article-source">
           {{articleItem.press}}
          </div>
          <div class="article-related">
            <div class="article-quote">
              <span>下载：{{articleItem.views}} </span>
              <span>被引：{{articleItem.views}}</span>
            </div>
            <div class="article-tips">
              <i-tag 
                v-for="(tagItem, tagIndex) in articleItem.tags" 
                :key="tagIndex" 
                class="i-tags" 
                :name="tagItem.value" 
                color="red"> {{tagItem.label}}</i-tag>
            </div>
          </div>
        </li>
      </ul>
      <i-spin size="large" :fix="true" v-if="isLoading"></i-spin>
      <i-load-more tip="暂无数据" :loading="false" />
    </div>
    <filtrate-article 
      ref="filtrate" 
      :articleList="articlelist"
      @onSelected="filtrateSelected"></filtrate-article>
  </div>
</template>

<script>
import downList from '@/components/downList'
import filtrateArticle from '@/pages/results/filtrateArticle'
import conditions from '@/mock/data'

export default {
  components:{
    'down-list': downList,
    'filtrate-article': filtrateArticle
  },
  props:{},
  data(){
    return {
      conditions: {}, 
      articlelist: [],
      selects: [],
      nextReqParam: {},
      isSenior: false,
      isLoading: false,
      curIndex: null,
      navs: [{title: "主题", key: "base"},
             {title: "相关度", key: "relevance"},
             {title: "文献类型", key: "documentType"}],
      keyword: "PHP"
    }
  },
  watch:{},
  computed:{},
  methods:{
    filtrateSelected(selected) {
      const query = Object.assign(this.nextReqParam.query, selected)
      this.nextReqParam.query = query
      console.log(query)
      // this.initData(this.nextReqParam)
    },
    watchDetail(code){
      wx.navigateTo({
        url: "/pages/details/main?code=" + code
      });
    },
    markWord(){
      let { keyword } = this;
      this.articlelist.forEach(v => {
          v.title = v.title.split(keyword)
          v.abstract  = v.abstract.split(keyword)
      });
    },
    showRightDrawer(){
      this.$refs.filtrate.toggleDrawer();
    },
    toggleSelect({title, key}, nIndex){
      this.$refs.downlist.toggleModel(true);

      this.curSelect = title != "文献类型" ? title : '全部'
      this.selects = conditions[key]
      this.curIndex = nIndex

      this.$refs.downlist.toggleDown(this.curSelect);
    },
    changeSelect(item){
      const { nextReqParam } = this
      const values = [
        {[item.value]: Object.values(nextReqParam.query)[0]}, 
        {order: [[item.value, item.order || "desc"]]}
      ]
      const keys = ["query", "config", "add"]
      this.nextReqParam[keys[this.curIndex]] = values[this.curIndex]
      this.navs[this.curIndex].title = item.title
      this.initData(this.nextReqParam)
    },
    async initData(nextReq){
      let { query: req } = this.$root.$mp
      req = Object.assign({}, req)
      let res = null
      this.isLoading = true
      this.nextReqParam = nextReq || {query: req}
      this.isSenior = req.isSenior
      if (this.isSenior) {
        delete req.isSenior
        res = await this.$http.postSearchBySenior(nextReq || {query: req});
      } else {
        res = await this.$http.postSearch(nextReq ||{query: req});
      }
      this.articlelist = this.$utils.toJson(res, ["tags", "directory", "keywords"])
      this.keyword = Object.values(req)[0]
      this.markWord()
      this.isLoading = false
    }
  },
  created(){},
  mounted(){
    this.articlelist = []
    this.conditions = conditions
    this.initData()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../stylus/mixin';
@import '../../stylus/colors';
.wrapper
  .header-nav
    position relative
    &-list
      display flex
      flex-direction row
      padding-top 15rpx
      padding-bottom 15rpx
      c-primary()
      text-align center
      div
        flex 2
        border-right 1rpx solid #ccc
        .packup
          color red
      .arrow
        display: inline-block;
        transition: all .4s ease-in-out;
        transform: translateY(-50%);
        width:0;
        height:0;
        border-width:4px 4px 0; 
        border-style:solid;
        border-color:#2d8cf0 transparent transparent;/*灰 透明 透明 */
      .anima
        transform: rotate(-180deg) translateY(4px);
      .more
        flex 1
        border-right none
  .content
    background-color white
    padding 15rpx
    position relative
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