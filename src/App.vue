<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
  // require styles
  @import "./assets/scss/core-style.css";
  @import "./assets/scss/style.scss";
  @import '../node_modules/mavon-editor/dist/markdown/github-markdown.min.css';
</style>
