<template>
  <div class="wrapper">
    <i-panel title="学科">
      <i-cell is-link url="/pages/discipline/main">
        <div slot="icon" class="box">
          <img :src="defalutImg" class="logo">
          <div class="some"> <h4>{{keyword}}</h4></div>
        </div>
        <i-icon type="add" size="25" class="add" color="orange" slot="footer" @click="doSomethings"/>
      </i-cell>
    </i-panel>
    <i-panel title="期刊">
      <i-cell-group>
          <i-cell v-for="(item, index) in 5" :key="index" is-link url="/pages/periodical/main">
            <div slot="icon" class="box">
              <img :src="defalutImg" class="logo">
              <div class="some">
                <div class="abstract">
                  <h4>信息技术</h4>
                  <i-tag class="i-tags" name="单个标签" color="red"> 优先</i-tag>
                  <i-tag class="i-tags" name="单个标签" color="red"> 核心</i-tag>
                </div>
                <p>中国电子科技集团</p>
              </div>
            </div>
            <i-icon type="add" size="25" color="orange" class="add" slot="footer"/>
          </i-cell>
       </i-cell-group>
    </i-panel>
  </div>
</template>

<script>
const defalutImg = require("../../../static/images/defalut.jpg")
export default {
  components:{},
  props:{},
  data(){
    return {
      defalutImg,
      keyword: ''
    }
  },
  watch:{},
  computed:{},
  methods:{
    checkDetails(){
      // wx.navigateTo({
      //   url: "/pages/classify/main"
      // });
    },
    doSomethings(){

    }
  },
  created(){
  },
  mounted(){
    const {keyword} = this.$root.$mp.query
    this.keyword = keyword
    wx.setNavigationBarTitle({
      title: keyword
    })
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  .add
    border 1px solid orange 
    padding 1px
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
</style>