<template>
  <div class="wrapper">
    <i-notice-bar icon="systemprompt" i-class="top-notice" closable speed>
      交院图书馆今日读书日正式开始了，赶紧点击参与!!
    </i-notice-bar>
    <i-card title="李庆超" extra="ID: 201643320855" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
      <div slot="content">
        <div class="caption-wrap">
          <text class="caption-title">我的读书记录</text>
          <i-collapse :name="name">
            <i-collapse-item
              name="name1"
              title="已借阅"
              i-class-title="collapse-item-title"
              i-class-content="collapse-item-content">
              <div slot="content">
                <ul class="graphic-list">
                  <li class="graphic-item" v-for="item in 6" :key="item" @click="goDetailView">
                    <img src="/static/images/defalut.jpg" alt="文章" class="graphic-item-img">
                    <p class="graphic-item-time">2016-9-6</p>
                  </li>
                </ul>
              </div>
            </i-collapse-item>
            <i-collapse-item
              name="name2"
              title="未归还"
              i-class-title="collapse-item-title"
              i-class-content="collapse-item-content">
              <div slot="content" i-class-content="green-text">
                斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
                Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
              </div>
            </i-collapse-item>
            <i-collapse-item
              name="name3"
              title="已逾期"
              i-class-title="collapse-item-title"
              i-class-content="collapse-item-content">
              <div slot="content">
                  乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。
              </div>
            </i-collapse-item>
          </i-collapse>
        </div>
      </div>
      <div slot="footer">为中华之崛起而读书 -周恩来</div>
    </i-card>
    <i-button type="info">查看帮助教程</i-button>
    <i-steps :current="0" direction="vertical">
      <i-step v-for="step in helpSteps" :key="step.id">
        <div slot="title">{{ step.title }}</div>
        <div slot="content">{{ step.content }}</div>
      </i-step>
    </i-steps>
  </div>
</template>

<script>
const helpSteps = [{
  id: 1,
  title: '选择图书',
  content: '可通过软件进行检索、查询在几楼具体的位置点',
}, {
  id: 2,
  title: '借阅书籍',
  content: '输入学号、归还日期、消磁点确认'
}, {
  title: '归还',
  id: 3,
  content: ' 放回指定地方、或工作人员'
}]
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      name: 'name1',
      helpSteps
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    goDetailView () {
       wx.navigateTo({
        url: "/pages/borrowDtas/main?isBorrow=0"
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  margin-top 8px
  .graphic-list
    display flex
    flex-wrap wrap
    justify-content space-between
   .graphic-item
    width 30%
    text-align center
    margin-bottom 8px
    &-img
      width 100%
      height 100px
  >>> .top-notice
    margin-bottom 8px
</style>
