<template>
  <div class="wrapper">
    <div class="article-header">
        <h4>{{article.title}}</h4>
        <div class="article-author">
          <span @click="goScholarsView(author)">{{article.author}}</span>
        </div>
    </div>
    <div class="article-content">
      <p class="article-abstract">
       {{article.abstract}}
      </p>
      <div class="article-keywords">
        关键词: &nbsp;&nbsp;<span v-for="(keyword, index) in article.keywords" :key="index">{{keyword.label}};</span>
      </div>
      <div class="article-institutions">
        机构: &nbsp;&nbsp;<span style="color: #2d8cf0" @click="goInstitutionView(article.press)">{{article.press}}</span>
      </div>
      <div class="article-ss">
        <span><i class="icon-cite"></i>  {{article.views}}</span>
        <span><i class="icon-down"></i>  {{article.views}}</span>
      </div>
      <i-button @click="sheetCancel" type="info" size="small"><i-icon type="flashlight_fill" size="20"/>下载PDO版(3879K)</i-button>
    </div>
    <div class="article-source" @click="checkYear">
      <i-panel>
        <i-cell is-link>
          <div slot="icon" class="box">
            <img :src="defalutImg" class="logo">
            <div class="some">
              <h4>{{article.column}}</h4>
              <p>{{article.date}}</p>
            </div>
          </div>
        </i-cell>
      </i-panel>
    </div>

    <i-button @click="handleClick" type="ghost" size="small" :loading="loading" v-if="!likes.length">查看相关文献</i-button>
    <i-panel title="相似文献" v-else>
      <i-cell-group>
          <i-cell :title="item.label" v-for="(item, index) in article.directory" :key="index" is-link>
            <span slot="icon" style="color:orange; font-size: 20px">·</span>
          </i-cell>
       </i-cell-group>
    </i-panel>

    <i-toast id="toast" />
    <i-action-sheet :visible="visible1" :actions="actions" show-cancel @cancel="sheetCancel"/>
  </div>
</template>

<script>
const { $Toast } = require('../../../static/iview/base/index');
const defalutImg = require("../../../static/images/defalut.jpg")

export default {
  components:{},
  props:{},
  data(){
    return {
      article: {},
      visible1: false,
      loading: false,
      likes: [],
      actions: [
        {
          name: '高清'
        },
        {
          name: '普通'
        },
        {
          name: '去分享',
          icon: 'share',
          openType: 'share'
        }
      ],
      defalutImg
    }
  },
  watch:{},
  computed:{
    countAuthor(){
      let {AuthorString} = this.article
      return /\,/.test(AuthorString) ? AuthorString.split(",") : [AuthorString]
    }
  },
  methods:{
    goScholarsView(sAuthor){
      wx.navigateTo({
        url: "/pages/scholars/main?author="+sAuthor
      })
    },
    goInstitutionView(sOrganization){
      wx.navigateTo({
        url: "/pages/institution/main?institution="+sOrganization
      })
    },
    handleClick(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.likes = ["车间管理系统"]
      }, 1500)
    },
    checkYear(){
      $Toast({
        content: '暂无年期信息'
      });
    },
    sheetCancel(){
      this.visible1 = !this.visible1
    },
    sheetClickItem({index}){
      console.log(index)
    }
  },
  mounted(){
    const { query: req } = this.$root.$mp
    this.$http.postSearch({query: req}).then(res => {
      this.article = this.$utils.toJson(res[0], ["tags", "directory", "keywords"])
    })
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  background-color #f8f8f9
  .article-header
    background-color #2d8cf0
    color white
    padding 20px 10px
    > h4
      font-size 18px
      margin-bottom 10px
    .article-author
      text-align right
      span
        display inline-block
        background-color rgba(0,0,0, 0.3)
        margin-right 10px
        padding 5px 10px
        border-radius 10px
  .article-source
    margin-top 10px
    .box
      display flex
      h4
        font-size 17px
      p 
        font-size 15px
      .logo
        width 70px
        height 100px
      .some
        display flex
        flex-direction column
        justify-content space-between
        padding-left 10px
  .article-content
    padding 10px
    background-color white
    .article-abstract
      line-height 1.5
      font-size 16px
      text-indent 20px
    .article-keywords
      color #ccc
      margin-top 15px
      margin-bottom 10px
      span
        display inline-block
        margin-right 5px
        color #2d8cf0
    .article-institutions
      color #ccc
      padding-bottom 15px
      margin-bottom 15px
      border-bottom 1px dashed  #ccc
    .article-ss
      span
        margin-right 5px
        display inline-block
        i
          position relative
          display inline-block
          width: 15px;
          height: 15px;
          border: 1px solid #ccc;
          font-size:10px;
          text-align:center;
          &::after
            text-align: center;
            line-height: 15px;
      .icon-cite
        &::after
          content: "引";
      .icon-down
        &::after
          content: "下";
</style>