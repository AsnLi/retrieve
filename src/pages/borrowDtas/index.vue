<template>
  <div class="wrapper">
    <i-cell-group>
      <i-cell title="借阅人" value="李庆超"></i-cell>
      <i-cell title="检查者" value="管理员1"></i-cell>
      <i-cell title="借阅时间" value="2019-04-07"></i-cell>
      <i-cell title="最大借阅时长" value="2019-07-07"></i-cell>
    </i-cell-group>
    <i-panel title="建议及反馈" v-if="!isBorrow">
      <i-input :value="advice" placeholder="你的建议" />
      <i-cell title="评分">
        <i-rate :value="3" />
      </i-cell>
    </i-panel>
    <i-button type="primary" @click="visible5 = true">确认{{stateTipText}}</i-button>
    <i-modal :title="stateTipText+'确认'" :visible="visible5" :actions="actions5" @click="handleClick5">
      <div>{{stateTipText}}后无法撤销哦</div>
    </i-modal>
    <i-message id="message" />
  </div>
</template>

<script>
const { $Message } = require('../../../static/iview/base/index');

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      advice: '',
      visible5: false,
      isBorrow: false,
      actions5: [
        {
          name: '取消'
        },
        {
          name: '归还',
          color: '#ed3f14',
          loading: false
        }
      ]
    }
  },
  computed: {
    stateTipText() {
      return this.isBorrow ? '借阅' : '归还'
    }
  },
  watch: {},
  mounted() {
    this.isBorrow = !!(+this.$root.$mp.query.isBorrow)
    if (this.isBorrow) this.actions5[1].name = '借阅';
  },
  created() {
  },
  methods: {
    handleClick5 ({mp: {_relatedInfo}}) {
      if (_relatedInfo.anchorTargetText === '取消') {
        this.visible5 = false
      } else {
        this.actions5[1].loading = true
        setTimeout(() => {
          this.actions5[1].loading = false
          this.visible5 = false
          $Message({
            content: `${this.stateTipText}成功！`,
            type: 'success'
          });
        }, 2000);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper{}
</style>
