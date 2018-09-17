<template>
  <div>
    <!-- ##### Checkout Area Start ##### -->
    <div class="checkout_area">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="checkout_details_area section-padding-100-20 clearfix">

              <div class="cart-page-heading mb-30">
                <h5>USER INFO</h5>
              </div>

              <form method="post">
                <div class="row">
                  <div class="col-md-5 mb-3">
                    <label for="account">Account <span>*</span></label>
                    <input type="text" class="form-control" id="account" value="" v-model="params.username" required
                           readonly>
                  </div>
                  <div class="col-md-5 mb-3">
                    <label for="nickname">NickName</label>
                    <input type="text" class="form-control" id="nickname" value="" v-model="params.nickname">
                  </div>
                  <div class="col-md-2 mb-3"></div>
                  <div class="col-md-2 mb-3">
                    <label for="sex">Sex</label>
                    <select class="w-100 nice-select" id="sex" v-model="params.sex">
                      <option value="1">male</option>
                      <option value="2">female</option>
                      <option value="3">secret</option>
                    </select>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label>Birthday</label>
                    <input type="text" class="form-control" id="birthday" placeholder="brithday" v-model="params.birthday">
                  </div>
                  <div class="col-12 mb-3 position-relative">
                    <label>Photo</label>
                    <UploadOSS :uploadOSSConf="uploadOSSConf" :DOM_ID="'photo'" v-if="uploadOSSConf.STS!=null"
                               @success="OSSUploadSuccess"></UploadOSS>
                    <img v-if="params.photo && params.photo!==''" :src="params.photo" class="upload_img1"/>
                    <p class="mt10"><span class="tips_text">建议图片长180px宽180px，支持jpg、jpeg、png，图片大小不超过2MB</span></p>
                  </div>
                  <div class="col-md-5 mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="params.email">
                  </div>
                  <div class="col-md-5 mb-3">
                    <label for="phone">Phone</label>
                    <input type="text" class="form-control" id="phone" v-model="params.phone">
                  </div>
                  <div class="col-12 mb-3">
                    <a href="javascript:;" class="btn essence-btn" @click="updateUserInfo(params)">Submit</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Checkout Area End ##### -->
    <vue-snotify></vue-snotify>
  </div>
</template>
<script>
  import UploadOSS from '@/components/common/upload/uploadOSS.vue'
  export default {
    components: {UploadOSS},
    data () {
      return {
        uploadOSSConf: {
          showMode: '1',
          style: 'img_upload',
          typeArr: 'image/png,image/jpg,image/jpeg',
          catalog: 'photo',
          fileName: '',
          maxSize: '2000000',
          STS: null
        },
        params: {
          birthday: ''
        }
      }
    },
    computed: {},
    mounted () {
      const self = this
      laydate.render({
        elem: '#birthday',
        done: function (value, date) {
          self.params.birthday = value;
        }
      });
    },
    created () {
      this.getUserInfo(this.$store.state.token_info.userId)
      this.getSTS()
    },
    methods: {
      OSSUploadSuccess (r) {
        if (r && r != '') {
          this.$set(this.params, r.dom_id, r.res.requestUrls[0])
        }
      },
      getUserInfo (id) {
        this.$api.get(this.$global.authApiPath, '/getUserInfo', {id: id}, r => {
          this.params = r.data
        })
      },
      updateUserInfo (params) {
        this.$api.post(this.$global.authApiPath, '/saveUserInfo', params, r => {
          this.$snotify.success('Change successed!');
        })
      },
      getSTS () {
        this.$api.get(this.$global.noAuthApiPath, '/getSTS', {}, r => {
          let STS = [r.data.tokenExpireTime, r.data.accessKeyId, r.data.accessKeySecret, r.data.securityToken, r.data.endpoint, r.data.bucket, r.data.region]
          this.uploadOSSConf.STS = STS
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
