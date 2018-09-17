<template>
  <div>
    <!-- ##### Blog Wrapper Area Start ##### -->
    <div class="single-blog-wrapper">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-12">
            <div class="regular-page-content-wrapper section-padding-100-20">
              <div class="regular-page-text">
                <h2>{{params.title}}</h2>
                <blockquote>
                  <h6>{{params.intro}}</h6>
                  <span>{{params.createDate}}</span>
                </blockquote>
                <div class="markdown-body" v-html="MDString"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Blog Wrapper Area End ##### -->
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import Marked from "marked";
  export default {
    components: {},
    data () {
      return {
        params: {},
        MDString: ''
      }
    },
    computed: {},
    mounted () {
    },
    created () {
      this.getDetail(this.$route.params.id)
    },
    methods: {
      getDetail (id) {
        this.$api.get(this.$global.authApiPath, '/learn/get', {id: id}, r => {
          this.params = r.data
          this.MDString = Marked(this.params.content)
        })
      }
    },
    filters: {
      formatDate (time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    }
  }
</script>

<style lang="scss">
</style>
