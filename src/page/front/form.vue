<template>
  <div>
    <!-- ##### Checkout Area Start ##### -->
    <div class="checkout_area">
      <div class="container">
        <div class="row">

          <div class="col-12 col-md-12">
            <div class="checkout_details_area section-padding-100-20 clearfix">

              <div class="cart-page-heading mb-30">
                <h5>CONTENT DETAIL</h5>
              </div>

              <form method="post">
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
                  <div class="col-md-4 mb-3">
                    <label for="Type">Type <span>*</span></label>
                    <select class="w-100 nice-select" id="type" v-model="params.type" @change="getSubClassificationList(params.type)">
                      <option v-for="item in classificationList" :key="item.id" :value="item.value">{{item.label}}</option>
                    </select>
                    <div class="error_color" v-if="!$v.params.type.required && $v.params.type.$dirty">Field is required</div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="subType">subType <span>*</span></label>
                    <select class="w-100 nice-select" id="subType" v-model="params.subType" @change="$v.params.subType.$touch()">
                      <option v-for="item in subClassificationList" :key="item.id" :value="item.value">{{item.label}}</option>
                    </select>
                    <div class="error_color" v-if="!$v.params.subType.required && $v.params.subType.$dirty">Field is required</div>
                  </div>
                  <div class="col-md-4 mb-3"></div>
                  <div class="col-12 mb-3">
                    <label for="intro">Intro</label>
                    <input type="text" class="form-control" id="intro" v-model="params.intro">
                  </div>
                  <div class="col-12 mb-3">
                    <label>Description</label>
                    <mavon-editor ref=md @imgAdd="$imgAdd" v-model="params.content"/>
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
  import {upload} from '@/utils/upload';
  import {required} from 'vuelidate/lib/validators';
  import Bus from '@/utils/bus'
  export default {
    components: { UploadOSS },
    data () {
      return {
        uploadOSSConf: { showMode: '1', style: 'img_upload2', typeArr: 'image/png,image/jpg,image/jpeg', catalog: 'learn', fileName: '', maxSize: '2000000', STS: null },
        params: {
          id: this.$route.params.id,
          title: '',
          cover: '',
          intro: '',
          content: '',
          type: this.$route.params.type
        },
        editorOption: {
        },
        classificationList: [],
        subClassificationList: []
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
        type: {
          required
        },
        subType: {
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
      this.getClassificationList()
    },
    methods: {
      // 绑定@imgAdd event
      $imgAdd (pos, $file) {
        var self = this
        // 第一步.将图片上传到服务器.
        upload($file, this.uploadOSSConf, {type: 'md', pos: pos})
        Bus.$on('MDSuccess', (r) => {
          self.$refs.md.$img2Url(r.pos, r.url);
        })
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm 指为mavonEditor实例，可以通过如下两种方式获取
        // 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        // 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      },
      OSSUploadSuccess (r) {
        if (r && r != '') {
          this.$set(this.params, r.dom_id, r.res.requestUrls[0])
        }
      },
      getDetail (id) {
        this.$api.get(this.$global.authApiPath, '/learn/get', {id: id}, r => {
          this.params = r.data
          this.getSubClassificationList(this.params.type)
        })
      },
      edit (params) {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          if (params.id && params.id!='' && params.id!='create') {
            params.updateBy = this.$store.state.token_info.userId
            params.updateDate = ''
            this.$api.post(this.$global.authApiPath, '/learn/update', params, r => {
              this.$router.push({path: '/list/' + params.type})
            })
          } else {
            params.id = ''
            params.updateBy = params.createBy = this.$store.state.token_info.userId
            this.$api.post(this.$global.authApiPath, '/learn/edit', params, r => {
              this.$router.push({path: '/list/' + params.type})
            })
          }
        }
      },
      getClassificationList () {
        this.$api.post(this.$global.authApiPath, '/classification/getClassificationList', {}, r => {
          this.classificationList = r.data
        })
      },
      getSubClassificationList (id) {
        this.$v.params.type.$touch()
        this.$api.get(this.$global.authApiPath, '/classification/getSubClassificationList', {id: id}, r => {
          this.subClassificationList = r.data
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
