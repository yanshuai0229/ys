<template>
  <input type="text" :id="id" class="J-xl" :placeholder="placeholder" />
</template>

<script>
  import Bus from '@/utils/bus'
    export default {
      name: 'laydate',
      mounted () {
        let self = this
        laydate.render({
          elem: '#' + self.id,
          type: 'datetime',
          value: (self.initVal) ? self.initVal: '',
          done: function (value) {
            Bus.$emit('laydate-changed', { id: self.model, value: value, prop: self.propVal })
          }
        });
      },
      props: ['model', 'placeholder', 'propVal', 'id', 'initVal']
    }
</script>

<style scoped>
  .J-xl {
    height: 27px;
    line-height: 27px;
    border: 1px solid #bcbcbc;
    font-family: Microsoft yahei;
    padding-left: 5px;
    border-radius: 3px;
  }
</style>
