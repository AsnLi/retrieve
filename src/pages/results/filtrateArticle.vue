<template>
  <i-drawer mode="right" :visible="showRight" @close="toggleDrawer">
    <div class="demo-container">
      <div class="box">
      <div class="filtrate">
        <i-collapse :name="name">
          <i-collapse-item v-for="(filtrateItem, index) in filtrateCon" :key="index"  
          :title="filtrateItem.title" :name="index" class="filtrate-item" @click="collapseOpen(index, filtrateItem.value)">
            <ul slot="content" class="filtrate-results">
              <li v-for="(datailsItem, key) in filtrateItem.list" :key="key"
              :class="{active: filtrateItem.list.length == 1}"
              @click="selectItem(datailsItem, index)">
                <p>{{datailsItem.title}}</p>
                <p class="nums"><b>{{datailsItem.num}}</b>篇</p>
              </li>
            </ul>
          </i-collapse-item>
        </i-collapse>
              <div class="filtrate-time">
        <span>时间</span>
        <div class="filtrate-input">
          <input type="text" v-model="time.start">
          <span>一</span>
          <input type="text" v-model="time.end">
        </div>
      </div>
      <div class="filtrate-quantum">
        <ul class="quantum-list">
          <li v-for="(timeItem, index) in timeData" :key="index" 
          :class="{active: index == selectedForm.time}" @click="toggleTime(index, timeItem)">
            <p>{{timeItem.time}}</p>
            <p><b>{{timeItem.label}}</b></p>
          </li>
        </ul>
      </div>
      </div>
      </div>
            <footer>
        <div class="but-reset" @click="initData">重置</div>
        <div class="but-submit" @click="toggleDrawer(true)">完成</div>
      </footer>
    </div>
  </i-drawer>
</template>

<script>
import {filtrateCon} from '@/mock/data'
const timeData = [
  {time: "2014-2018", label: "全部"},
  {time: "2009-2018", label: "最新"},
  {time: "1915-2018", label: "近十年"}
]
export default {
  components:{},
  props:{
    articleList: {
      type: Array,
      default: []
    }
  },
  watch: {
    articleList(articleList) {
      this.filtrateCon.forEach((item, index) => {
        this.filtrateCon[index].list = []
      })
      this.isUpdata = true
      this.initForm()
    }
  },
  data(){
    return {
      showRight: false,
      isUpdata: false,
      timeData: [],
      name: null,
      filtrateCon: [
        {title: "栏目", index: 0, value: "column", list: []},
        {title: "标签", index: 1, value: "tags", list: []},
        {title: "机构", index: 2, value: "press", list: []},
        {title: "作者", index: 3, value: "author", list: []}
      ],
      selectedForm: {time: '', interval: []},
      selectedList: {},
      time: {
        start: '1915',
        end: '2018'
      }
    }
  },
  computed:{},
  filters: {
    getDateYear(date) {
      return date.split("-")[0]
    }
  },
  methods:{
    collapseOpen(nIndex, value){
      if (this.filtrateCon[nIndex].list.length) return;
      const collList = this.getListLitmByKey(this.articleList, value, (item, key, arr, isArray) => {
        const obj = {}
        if (!isArray) {
          obj.title = item
          obj.num = arr.join("").match(new RegExp(item, "gi")).length
        } else {
          const rollOutArr = [...[].concat.apply([], arr)]
          const setArr = Array.from(new Set(rollOutArr))
          
          obj.title = setArr[key],
          obj.num = rollOutArr.join("").match(new RegExp(setArr[key] || '', "gi")).length
        }
        return obj
      })
      this.filtrateCon[nIndex].list = collList;
    },
    toggleDrawer(isFinsh){
       const { time, interval } = this.selectedForm
       this.showRight = !this.showRight
       if (typeof isFinsh == "boolean") {
         if (time != null) {
           this.selectedList.date = interval
         }
         this.$emit("onSelected", this.selectedList)
       }
    },
    selectItem(oSelected, nIndex){
      const conItem = this.filtrateCon[nIndex]
      this.filtrateCon[nIndex].list = [oSelected]
      this.selectedList[conItem.value] = oSelected.title 
    },
    toggleTime(index, item){
      this.selectedForm = {
        time: index,
        interval: item.time.split("-").map(time => time += "-01-01")
      }
    },
    getListLitmByKey(list, key, callBack) {
      let isArray = false
      const collList = list.map(item => {
          if(item[key] instanceof Array) {
            isArray = true
            return item[key].map(child => child.label)
          }
          return item[key]
      })
      .map((item, key, arr) => callBack.apply(this, [item, key, arr, isArray]))
      .filter(item => item.title)
      .reduce((output, item) => {
        if(!output.heap.includes(item.title)) {
          output.list.push(item)
        }
        output.heap.push(item.title)
        return output
      }, {heap: [], list: []}).list
      
      return collList
    },
    initData(){
      const backup = wx.getStorageSync("backup")
      for(let val in backup){
        this[val] = backup[val];
      }
    },
    initForm() {
      const dates = this.articleList.map(item => item.date).sort()
      const term = [dates[0], dates[dates.length - 1]]
      const year = new Date().getFullYear()
      if (term[0]) {
        this.time.start = term[0].split("-")[0]
        this.time.end = term[1].split("-")[0]
        this.timeData = [999, 2, 20].map((item, index, arr) => {
          return dates.filter(item => {
            return year - item.split("-")[0] <= arr[index];
          })
        }).filter(item => item.length >= 2).map((item, index) => {
          return {
            time: [item[0].split("-")[0], item[item.length - 1].split("-")[0]].join("-"),
            label: "区间" + (index + 1)
          }
        })
      }
    },
    backupCopy(){
      let {name, filtrateCon, selectedForm, time} = this
      wx.setStorage({
        key: 'backup',
        data: {name, filtrateCon, selectedForm, time}
      })
    }
  },
  created(){},
  mounted(){
    this.backupCopy()
  }
}
</script>

<style lang="stylus" scoped>
  .demo-container
    width:80vw;
    background:#fff;
    overflow-y scroll
    height 100vh
    .box
      min-height: calc(100vh - 61px);
    .active
      border: 1px solid orange !important
      &::before
        content: "";
        position: absolute;
        right: -8px;
        bottom: -5px;
        border-width: 15px 15px 0;
        border-style: solid;
        border-color: orange transparent transparent;
        transform: rotate(-45deg);
      &::after
        content: "√";
        position: absolute;
        right: 2px;
        bottom: -5px;
        color: white;
        font-size 10px
    .filtrate-results
    .quantum-list
      margin-bottom: 5px;
      width 100%
      li
        display: inline-block;
        width 47%
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-right: 5px;
        position relative
        overflow hidden
        b
          color orange
          display inline-block
    .filtrate-results li
      height 60px
      position relative
      .nums
        position absolute
        bottom 0
        width 100%
    .quantum-list
      display flex
      padding-left 10px
      padding-right 10px
      li
        flex 1
        line-height 1.5
    .filtrate-time
      display flex
      padding 15px
      span
        width 20%
        text-align center
        line-height 2
      .filtrate-input
        display inherit
        input
          border: 1px solid #ccc;
          padding-left 10px
    footer
      width 100%
      background-color #e9eaec
      padding 10px
      display flex
      div
        flex 1
        padding-top 10px
        padding-bottom 10px
        text-align center
        border-radius 5px
        margin-right 10px
      .but-reset
        border 1px solid orange
        color black
      .but-submit
        background-color orange
        color white
</style>