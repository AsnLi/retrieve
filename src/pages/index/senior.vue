<template>
 <div class="wrapper">
    <i-panel title="您可输入一个或多个条件进行搜索">
      <p>提示1: +(并含) -(不含) ~(或含) </p>
      <p>提示2: 查询前后不能包括(+, -, ~, 例如: +头， 头-) </p>
      <p>提示3: 查询条件不能包括重复布尔逻辑(++, --, ~~等待 例如: 头++尾) </p>
      <div class="from-item" v-for="(baseItem, index) in con.base" :key="index">
          <div class="input-title">
            <i-icon type="activity" size="20"/> 
            <span>{{baseItem.title}}</span>
          </div>
          <input type="text" v-model="from.base[baseItem.value]">
      </div>
      <div class="caption-wrap">
        <i-collapse :name="name">
          <i-collapse-item title=" 学位论文常用搜索条件" name="name1">
            <div slot="content">
              <div class="from-item" v-for="(degreeItem, index) in con.degree" :key="index">
                <div class="input-title">
                  <i-icon type="activity" size="20"/> 
                  <span>{{degreeItem.title}}</span>
                </div>
                <input type="text" v-model="from.degree[degreeItem.value]">
              </div>
            </div>
          </i-collapse-item>
          <i-collapse-item title=" 会议论文常用搜索条件" name="name2">
            <div slot="content" i-class-content="green-text">
              <div class="from-item" v-for="(meetingItem, index) in con.meeting" :key="index">
                <div class="input-title">
                  <i-icon type="activity" size="20"/> 
                  <span>{{meetingItem.title}}</span>
                </div>
                <input type="text" v-model="from.meeting[meetingItem.value]">
              </div>
            </div>
          </i-collapse-item>
        </i-collapse>
      </div>
    </i-panel>
    <i-radio-group :current="'苹果'" :groups="[{id: 1, value: '香蕉'}, {id: 2, value: '苹果'}]" position="left"></i-radio-group>
    <i-button @click="clickHandle" type="primary">搜索</i-button>
    <i-toast id="toast" />
 </div>
</template>

<script>
const { $Toast } = require('../../../static/iview/base/index');
import con from '@/mock/data'
let inputChars = ["+"]

export default {
  data () {
    return {
      con,
      from: {
        base: {},
        degree: {},
        meeting: {}
      },
      name: 'name2'
    }
  },
  watch: {
    'from.base': {
      handler: function (item) {
        const chars = ["+", "-", "~"]
        const target = Object.keys(item["__keyPath"] || {})
        if (!item.__keyPath) return;
        const inputText = item[target[target.length - 1]]
        const lastText = inputText[inputText.length - 1]
        if (inputText.length == inputChars.length) {
          inputChars.push(lastText)
        } else {
          if (inputText) {
            inputChars.pop()
          } else {
            inputChars = ["+"]
          }
        }
        // console.log(inputChars, inputText);
        if (!chars.includes(lastText)) return;
        if (
          chars.includes(lastText) && 
          chars.includes(inputChars[inputChars.length - 2])
        ) {
          console.log("no");
        }
      },
      deep: true
    }
  },
  methods: {
    initFrom(){
      const {base, degree, meeting} = con
      const toObj = arr => arr.reduce((p, c) => {
            return p[c.value] = '', p
      }, {})
      this.from.base = toObj(base)
      this.from.degree = toObj(degree)
      this.from.meeting = toObj(meeting)
    },

    clickHandle () {
      const { base } = this.from
      const req = Object.keys(base).reduce((target, key) => {
        if (base[key] && key != "__keyPath") {
          target[key] = base[key]
        }
        return target
      }, {isSenior: true})
      wx.navigateTo({
        url: this.$utils.objToUrlParams("/pages/results/main", req)
      })
    }
  },

  mounted() {
    this.initFrom()
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  .checkbox-group
    display flex
    &-item
      margin-right 10px
  .from-item
    display flex
    padding 5px 10px
    .input-title
      padding-right 10px
      span
        width: 90rpx;
        display:inline-block;
        text-align:justify;
        text-align-last:justify;
        margin-left: 5px;
    input
    .checkbox-group
      border-bottom 1px solid #dddee1
      flex 1
  .caption-wrap span
      width: 130rpx !important;
</style>