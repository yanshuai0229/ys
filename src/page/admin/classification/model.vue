<template>
  <div>
    <!-- ##### Checkout Area Start ##### -->
    <div class="checkout_area">
      <div class="container">
        <div class="row">

          <div class="col-12 col-md-12">
            <div class="checkout_details_area section-padding-100-20 clearfix">

              <div class="cart-page-heading mb-30">
                <h5>CLASSIFICATION DETAIL</h5>
              </div>
              <form>
                <div class="row">
                  <div class="col-12 mb-3">
                    <label for="label">Label <span>*</span></label>
                    <input type="text" class="form-control" id="label" value="" v-model="params.label" @blur="$v.params.label.$touch()">
                    <div class="error_color" v-if="!$v.params.label.required && $v.params.label.$dirty">Field is required</div>
                  </div>
                  <div class="col-3 mb-3">
                    <label for="value">Value <span>*</span></label>
                    <input type="number" class="form-control" id="value" v-model="params.value" @blur="$v.params.value.$touch()">
                    <div class="error_color" v-if="!$v.params.value.required && $v.params.value.$dirty">Field is required</div>
                  </div>
                  <div class="col-3 mb-3">
                    <label for="sort">Sort <span>*</span></label>
                    <input type="number" class="form-control" id="sort" v-model="params.sort" @blur="$v.params.sort.$touch()">
                    <div class="error_color" v-if="!$v.params.sort.required && $v.params.sort.$dirty">Field is required</div>
                  </div>
                  <div class="col-7 mb-3"></div>
                  <div class="col-12 mb-3 position-relative">
                    <label>Icon <span>*</span></label>
                    <UploadOSS :uploadOSSConf="uploadOSSConf" :DOM_ID="'icon'" v-if="uploadOSSConf.STS!=null"  @success = "OSSUploadSuccess"></UploadOSS>
                    <img v-if="params.icon && params.icon!==''" :src="params.icon"  class="upload_img2" />
                    <p class="mt10"><span class="tips_text">建议图片长350px宽240px，支持jpg、jpeg、png，图片大小不超过2MB</span></p>
                    <div class="error_color" v-if="!$v.params.icon.required && $v.params.icon.$dirty">Field is required</div>
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
          label: '',
          value: '',
          icon: '',
          parentId: this.$route.params.pid,
          sort: ''
        }
      }
    },
    validations: {
      params: {
        label: {
          required
        },
        value: {
          required
        },
        icon: {
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
      if (this.$route.params.parentId==='create') {
        this.params = {
          id: '',
          label: '',
          value: '',
          icon: '',
          parentId: this.$route.params.id,
          sort: ''
        }
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
        this.$api.get(this.$global.authApiPath, '/classification/get', {id: id}, r => {
          this.params = r.data
        })
      },
      edit (params) {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          if (params.id && params.id!='' && params.id!='create') {
            params.updateBy = this.$store.state.token_info.userId
            this.$api.post(this.$global.authApiPath, '/classification/update', params, r => {
              this.$router.push({path: '/admin/classification/list'})
            })
          } else {
            this.$api.get(this.$global.authApiPath, '/classification/checkValueByParentId', {parentId: params.parentId, value: params.value}, r => {
              params.updateBy = params.createBy = this.$store.state.token_info.userId
              this.$api.post(this.$global.authApiPath, '/classification/edit', params, r => {
                this.$router.push({path: '/admin/classification/list'})
              })
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
