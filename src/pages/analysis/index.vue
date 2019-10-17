<template>
  <div class="wrapper">
    <div class="header-nav">
      <div class="header-nav-list">
        <div v-for="(item, index) in navs" :key="index" @click="toggleSelect(item, index)">
          {{item.title}} <span class="arrow" :class="{anima:index == curIndex}"></span>
        </div>
      </div>
      <down-list :list="selects" @itemClick="changeSelect" ref="downlist"></down-list>
    </div>
    <div class="scholars-article">
        <div class="view-header">
          <span class="close">近五年发文量趋势</span>
          <div>
            <span>一篇</span>
            <span>0.05%</span>
          </div>
        </div>
        <div class="view-box">Echars实例图</div>
    </div>
    <div class="scholars-article">
        <div class="view-header">
          <span class="close"><i-icon type="other" size="20" />每年发文量数据表</span>
          <span class="details"><i-icon type="share" size="20" />下载</span>
        </div>
        <table>
            <tr>
              <th>时间</th>
              <th>发文量</th>
              <th>年环比</th>
            </tr>
            <tr v-for="(item, index) in 3" :key="index">
              <td>全部</td>
              <td>1</td>
              <td>————</td>
            </tr>
        </table>
    </div>
    <i-action-sheet :visible="visible1" :actions="actions" show-cancel @cancel="sheetCancel">
      <div slot="header" style="padding: 16px">
        <div style="color: #444;font-size: 16px">确定吗？</div>
        <span>删除后无法恢复哦</span>
      </div>
    </i-action-sheet>
  </div>
</template>
 
<script>     
import downList from '@/components/downList'
import {allDocuments, ageLimit} from '@/mock/data'

export default {
  components:{
    'down-list': downList
  },
  props:{},
  data(){
    return {
      conditions: {
        allDocuments,
        ageLimit
      },
      visible1: false,
      actions: [
          {
              name: '删除',
              color: '#ed3f14'
          }
      ],
      selects: [],
      curIndex: null,
      navs: [{title: "全部", key: "ageLimit"},
             {title: "全部文献", key: "allDocuments"}],
    }
  },
  watch:{},
  computed:{},
  methods:{
    toggleSelect({title, key}, nIndex){
      this.$refs.downlist.toggleModel(true);

      this.curSelect = title != "文献类型" ? title : '全部'
      this.selects = this.conditions[key]
      this.curIndex = nIndex

      this.$refs.downlist.toggleDown(this.curSelect);
    },
    changeSelect(val){
      if(val == "自定义") this.sheetCancel();
      this.navs[this.curIndex].title = val
    },
    sheetCancel(){
      this.visible1 = !this.visible1
    },
  },
  created(){},
  mounted(){}
}
</script>

<style lang="stylus" scoped>
.wrapper
  .header-nav
    position relative
    background-color white
    &-list
      display flex
      flex-direction row
      padding-top 15rpx
      padding-bottom 15rpx
      c-primary()
      text-align center
      div
        flex 1
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
  .scholars-article
    background-color white
    margin-bottom 10px
    margin-top 10px
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