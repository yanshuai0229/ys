<template>
  <div>
    <!-- ##### Header Area Start ##### -->
    <Header></Header>
    <!-- ##### Header Area End ##### -->

    <router-view></router-view>

    <!-- ##### Footer Area Start ##### -->
    <Footer></Footer>
    <!-- ##### Footer Area End ##### -->
  </div>
</template>
<script>
import Header from '@/components/project/header/header.vue'
import Footer from '@/components/project/footer/footer.vue'
export default {
  components: {Header, Footer},
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
</style>
