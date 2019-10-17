<template>
  <ul class="down-list" v-show="isShowDown" :class="{hasSub: isOwnChild}" @click="toggleModel(false)">
    <li class="down-list-item" 
        v-for="(item, index) in list" 
        :key="index"
        :class="{cur: item.title == curActive}"
        @click="toggleType(item, index)">&nbsp; · &nbsp;{{item.title}}
        <ul class="subList-item" v-if="!!item.subList">
          <li v-for="(subItem, key) in item.subList" :key="key">{{subItem.title}}</li>
        </ul>
    </li>
  </ul>
</template>

<script>
export default {
  components:{},
  props:{
    list: {
      type: Array,
      defalut: [],
      required: true
    }
  },
  data(){
    return {
      isShowDown: false,
      isOwnChild: false,
      curActive: ''
    }
  },
  watch: {
    isShowDown(){
      if (this.isShowDown) 
        this.isOwnChild = this.list.some(v => v.subList);
    }
  },
  computed: {},
  methods: {
    toggleModel(bIsShow){
      this.isShowDown = bIsShow
    },
    // event Bus ？
    toggleDown(sSelected){
      this.curActive = sSelected;
    },
    toggleType(item){
      this.curActive = item.title
      this.toggleModel(false)
      this.$emit('itemClick', item)
    }       
  },
  created() {},
  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/colors';
.down-list
  position:absolute
  width 100vw
  min-height 100vh
  background-color rgba(0,0,0,0.3)
  z-index 6
  li
    padding-top 15rpx
    padding-bottom 15rpx
    border-top 1rpx solid #F5F6F7
    background-color white
    c-sub()
  .subList-item
    margin-top 5px
    li
      text-indent 40px
  .cur
    color #2b85e4 !important
.hasSub > li
  c-title()
</style>