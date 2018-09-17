<template>
  <div>
    <!-- ##### Welcome Area Start ##### -->
    <!--<section class="welcome_area bg-img background-overlay bg-1">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12">
            <div class="hero-content">
              <h6></h6>
              <h2>Fighting!</h2>
              &lt;!&ndash;<a href="javascript:;" class="btn essence-btn"></a>&ndash;&gt;
            </div>
          </div>
        </div>
      </div>
    </section>-->
    <!-- ##### Welcome Area End ##### -->

    <!-- ##### Top Catagory Area Start ##### -->
    <div class="top_catagory_area section-padding-80 clearfix">
      <div class="container">
        <div class="row justify-content-center">
          <!-- Single Catagory -->
          <div class="col-12 col-sm-6 col-md-4" v-for="item in classificationList" :key="item.id">
            <div class="single_catagory_area d-flex align-items-center justify-content-center bg-img" :style="{backgroundImage: 'url('+ item.icon +')'}">
              <div class="catagory-content">
                <router-link :to="'/list/' + item.value">{{item.label}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Top Catagory Area End ##### -->

    <!-- ##### CTA Area Start ##### -->
    <div class="cta-area">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="cta-content bg-img background-overlay bg-5">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### CTA Area End ##### -->
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        classificationList: []
      }
    },
    computed: {},
    mounted () {
    },
    created () {
      this.getClassificationList()
    },
    methods: {
      goList (type) {
        this.$router.push({path: '/list/' + type})
      },
      edit (type, id) {
        this.$router.push({path: '/form/' + type + '/' + id})
      },
      getClassificationList () {
        this.$api.post(this.$global.authApiPath, '/classification/getClassificationList', {}, r => {
          this.classificationList = r.data
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
