<template>
  <div class="wrapper">
    <i-tabs :current="current" @change="handleChange">
      <i-tab key="choiceness" title="精选"></i-tab>
      <i-tab key="periodical" title="期刊"></i-tab>
      <i-tab key="pegatron" title="博硕"></i-tab>
      <i-tab key="conference" title="会议"></i-tab>
      <i-tab key="newspaper" title="报纸"></i-tab>
    </i-tabs>
    <ul class="choiceness-list" v-show="current == 'choiceness'">
      <div class="now-date">{{nowDate}}</div>
      <li class="choiceness-list-item">
        <h4>啊实打实打算到点卡送的骄傲视频空间的</h4>
        <p>按时打算到i家婆实际出票惊悚派对就怕是啊实打实的就安排可我觉得破案就打开了是</p>
      </li>
      <li class="choiceness-list-item">
        <h4>啊实打实打算到点卡送的骄傲视频空间的</h4>
        <p>按时打算到i家婆实际出票惊悚派对就怕是啊实打实的就安排可我觉得破案就打开了是</p>
      </li>
    </ul>
    <ul class="periodical-list" v-show="current != 'choiceness'">
      <li class="periodical-list-item" v-for="(item, index) in 3" :key="index">
        <h4>啊实打实打算到点卡送的骄傲视频空间的 <b class="hot-tip"></b></h4>
        <p>按时打算到i家婆实际出票惊悚派对就怕是啊实打实的就安排可我觉得破案就打开了是</p>
        <div class="footer">
          <span class="soure">1111</span>
          <span>22222</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      current: "choiceness"
    }
  },
  watch:{},
  computed:{
    nowDate(){
      const DATE = new Date();
      let year = DATE.getFullYear(),
          month = DATE.getMonth() + 1,
          day  = DATE.getDate();
      return `${year} 年 ${month} 月 ${day} 日` 
    }
  },
  methods:{
    handleChange ({mp: {detail}}) {
      this.current = detail.key
    }
  },
  created(){},
  mounted(){}
}
</script>

<style lang="stylus" scoped>
.wrapper
  .periodical-list
  .choiceness-list
    background-color white
    padding 10px 20px
    &-item
      border-bottom 1px solid #ccc
      padding-bottom 10px
      margin-top 10px
      h4
        font-size 16px
        color: #1c2438
        margin-bottom 10px
        position relative
        b
          position absolute
          width 5px
          height 5px
          background-color red
          border-radius 50%
          left -10px
          top 50% 
          margin-top -2px
      p
        color #80848f
      .footer
        display flex
        justify-content space-between 
        margin-top 8px
        .soure
          color #19be6b
  .choiceness-list
    padding 10px
    .now-date
      text-indent 20px
      padding-bottom 10px
      margin-left -15px
      margin-right -15px
      color #2d8cf0
      border-bottom 1px solid #ccc
</style>