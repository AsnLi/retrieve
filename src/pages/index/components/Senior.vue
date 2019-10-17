<template>
 <div class="wrapper">
    <i-panel title="您可输入一个或多个条件进行搜索">
      <div class="from-item" v-for="(baseItem, index) in con.base" :key="index">
          <div class="input-title">
            <i-icon type="activity" size="20"/>
            <span>{{baseItem.title}}</span>
          </div>
          <input type="text" v-model="from.base[baseItem.value]">
      </div>
      <div class="checkbox-group">
        <div class="checkbox-group-item">
            <input type="checkbox" name="name1" id="name1">
            <label for="name1">精确</label>
        </div>
        <div class="checkbox-group-item">
            <input type="checkbox" name="name2" id="name2">
            <label for="name2">模糊</label>
        </div>
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
        <div class="checkbox-group">
          <div class="checkbox-group-item">
              <input type="checkbox" name="name1" id="name1">
              <label for="name1">并含</label>
          </div>
          <div class="checkbox-group-item">
              <input type="checkbox" name="name2" id="name2">
              <label for="name2">或含</label>
          </div>
          <div class="checkbox-group-item">
              <input type="checkbox" name="name2" id="name2">
              <label for="name2">不含</label>
          </div>
        </div>
      </div>
    </i-panel>
    <i-button @click="clickHandle" type="primary">搜索</i-button>
    <i-toast id="toast" />
 </div>
</template>

<script>
const { $Toast } = require('./toast.js');
import con from '@/mock/data'
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
      $Toast({
        content: '搜索内容不能为空2'
      });
      wx.navigateTo({
        url: "/pages/results/main"
      });
      console.log(this.from)
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
