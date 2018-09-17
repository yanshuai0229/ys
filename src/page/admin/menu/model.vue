<template>
  <div>
    <!-- ##### Checkout Area Start ##### -->
    <div class="checkout_area">
      <div class="container">
        <div class="row">

          <div class="col-12 col-md-12">
            <div class="checkout_details_area section-padding-100-20 clearfix">

              <div class="cart-page-heading mb-30">
                <h5>MENU DETAIL</h5>
              </div>
              <form>
                <div class="row">
                  <div class="col-12 mb-3">
                    <label for="title">Title <span>*</span></label>
                    <input type="text" class="form-control" id="title" value="" v-model="params.title" @blur="$v.params.title.$touch()">
                    <div class="error_color" v-if="!$v.params.title.required && $v.params.title.$dirty">Field is required</div>
                  </div>
                  <div class="col-12 mb-3 position-relative">
                    <label>Cover <span>*</span></label>
                    <UploadOSS :uploadOSSConf="uploadOSSConf" :DOM_ID="'cover'" v-if="uploadOSSConf.STS!=null"  @success = "OSSUploadSuccess"></UploadOSS>
                    <img v-if="params.cover && params.cover!==''" :src="params.cover"  class="upload_img2" />
                    <p class="mt10"><span class="tips_text">建议图片长350px宽240px，支持jpg、jpeg、png，图片大小不超过2MB</span></p>
                    <div class="error_color" v-if="!$v.params.cover.required && $v.params.cover.$dirty">Field is required</div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label>Status <span>*</span></label>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="statusOptions" id="statusOptions1" value="0" v-model="params.status">
                      <label class="form-check-label" for="statusOptions1">Close</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="statusOptions" id="statusOptions2" value="1" v-model="params.status">
                      <label class="form-check-label" for="statusOptions2">Open</label>
                    </div>
                    <div class="error_color" v-if="!$v.params.status.required && $v.params.status.$dirty">Field is required</div>
                  </div>
                  <div class="col-md-6 mb-3"></div>
                  <div class="col-6 mb-3">
                    <label for="link">Link <span>*</span></label>
                    <input type="text" class="form-control" id="link" v-model="params.link" @blur="$v.params.title.$touch()">
                    <div class="error_color" v-if="!$v.params.link.required && $v.params.link.$dirty">Field is required</div>
                  </div>
                  <div class="col-md-6 mb-3"></div>
                  <div class="col-2 mb-3">
                    <label for="sort">Sort <span>*</span></label>
                    <input type="number" class="form-control" id="sort" v-model="params.sort" @blur="$v.params.title.$touch()">
                    <div class="error_color" v-if="!$v.params.sort.required && $v.params.sort.$dirty">Field is required</div>
                  </div>
                  <div class="col-12 mb-3">
                    <a href="javascript:;" class="btn essence-btn" @click="edit(params)">Submit</a>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- ##### Checkout Area End ##### -->
  </div>
</template>
<script>
  import UploadOSS from '@/components/common/upload/uploadOSS.vue'
  import {required} from 'vuelidate/lib/validators';
  export default {
    components: { UploadOSS },
    data () {
      return {
        uploadOSSConf: { showMode: '1', style: 'img_upload2', typeArr: 'image/png,image/jpg,image/jpeg', catalog: 'learn', fileName: '', maxSize: '2000000', STS: null },
        params: {
          id: this.$route.params.id,
          title: '',
          cover: '',
          status: '1',
          link: '',
          sort: ''
        }
      }
    },
    validations: {
      params: {
        title: {
          required
        },
        cover: {
          required
        },
        status: {
          required
        },
        link: {
          required
        },
        sort: {
          required
        }
      }
    },
    computed: {},
    mounted () {
    },
    created () {
      if (this.$route.params.id!=='create') {
        this.getDetail(this.$route.params.id)
      }
      this.getSTS()
    },
    methods: {
      OSSUploadSuccess (r) {
        if (r && r != '') {
          this.$set(this.params, r.dom_id, r.res.requestUrls[0])
        }
      },
      getDetail (id) {
        this.$api.get(this.$global.authApiPath, '/menu/get', {id: id}, r => {
          this.params = r.data
        })
      },
      edit (params) {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          if (params.id && params.id!='' && params.id!='create') {
            params.updateBy = this.$store.state.token_info.userId
            params.createDate = ''
            params.updateDate = ''
            this.$api.post(this.$global.authApiPath, '/menu/update', params, r => {
              this.$router.push({path: '/admin/menu/list'})
            })
          } else {
            params.id = ''
            params.updateBy = params.createBy = this.$store.state.token_info.userId
            this.$api.post(this.$global.authApiPath, '/menu/edit', params, r => {
              this.$router.push({path: '/admin/menu/list'})
            })
          }
        }
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
