<template>
  <footer class="footer_area clearfix">
    <div class="container">
      <div class="row">
        <!-- Single Widget Area -->
        <div class="col-12 col-md-6">
          <div class="single_widget_area d-flex mb-30">
            <!-- Logo -->
            <div class="footer-logo mr-50">
              <a href="javascript:;"><img src="./images/logo1.png" alt=""></a>
            </div>
            <!-- Footer Menu -->
            <div class="footer_menu">
              <ul>
                <!--<li><a href="javascript:;">Learn</a></li>
                <li><a href="javascript:;">Note</a></li>
                <li><a href="javascript:;">Blog</a></li>-->
              </ul>
            </div>
          </div>
        </div>
        <!-- Single Widget Area -->
        <div class="col-12 col-md-6">
          <div class="single_widget_area mb-30">
            <ul class="footer_widget_menu">
              <li><a href="javascript:;">CSDN</a></li>
              <li><a href="javascript:;">Baidu</a></li>
              <li><a href="javascript:;">阿里云</a></li>
              <li><a href="javascript:;">W3C</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row align-items-end">
        <!-- Single Widget Area -->
        <div class="col-12 col-md-6">
          <div class="single_widget_area">
            <div class="footer_heading mb-30">
              <h6>Subscribe</h6>
            </div>
            <div class="subscribtion_form">
              <form action="#" method="post">
                <input type="email" name="mail" class="mail" placeholder="Your email here">
                <button type="submit" class="submit"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
              </form>
            </div>
          </div>
        </div>
        <!-- Single Widget Area -->
        <div class="col-12 col-md-6">
          <div class="single_widget_area">
            <div class="footer_social_area">
              <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="Github"><i class="fa fa-github" aria-hidden="true"></i></a>
              <a href="javascript:;" data-toggle="tooltip" data-placement="top" title="QQ"><i class="fa fa-qq" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12 text-center">
          <p>Copyright &copy; 2018.Company name All rights reserved.</p>
        </div>
      </div>

    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  },
  mounted () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped>
  @import './footer.css';
</style>
