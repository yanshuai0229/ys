<template>
  <div class="tan px_kcadd">
    <div class="px_add_con" :style="boxStyle">
      <div class="rdiv">
        <h3 v-if="opts.title">{{opts.title}}</h3>
        <h3 v-else>请填写标题</h3>
        <a href="javascript:void(0);" class="close" @click="$emit('close')"></a>
      </div>
      <div :style="contentStyle">
        <component :is="opts.currentComponent.template" :ref="opts.currentComponent.name" :params="opts.currentComponent"></component>
      </div>
      <div class="w240 wrap" style="height: 40px;">
        <input name="" type="button" value="确定" class="all_btn" @click="getData" />
        <input name="" type="button" value="取消" @click="cancel" class="all_btn color_hui" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['opts'],
    mounted () {
    },
    computed: {
      boxStyle () {
        return {
          width: this.opts.styles.width + 'px',
          height: this.opts.styles.height + 'px',
          marginLeft: -(Number(this.opts.styles.width) / 2) + 'px',
          marginTop: -(Number(this.opts.styles.height) / 2) + 'px'
        }
      },
      contentStyle () { // 中间区域的高度
        return {
          height: Number(this.opts.styles.height) - 40 - 51 + 'px'
        }
      }
    },
    methods: {
      getData () {
        if (this.opts.yes) {
          this.opts.yes(this.$refs[this.opts.currentComponent.name][this.opts.currentComponent.outputsKey])
        }
        this.$emit('close')
      },
      cancel () {
        if (this.opts.closed) {
          this.opts.closed()
        }
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>
