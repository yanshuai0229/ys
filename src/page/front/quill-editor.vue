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
                    <input type="text" class="form-control" id="title" value="" v-model="params.title" required>
                  </div>
                  <div class="col-12 mb-3 position-relative">
                    <label>Cover <span>*</span></label>
                    <UploadOSS :uploadOSSConf="uploadOSSConf" :DOM_ID="'cover'" v-if="uploadOSSConf.STS!=null"  @success = "OSSUploadSuccess"></UploadOSS>
                    <img v-if="params.cover && params.cover!==''" :src="params.cover"  class="upload_img2" />
                    <p class="mt10"><span class="tips_text">建议图片长350px宽200px，支持jpg、jpeg、png，图片大小不超过2MB</span></p>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="Type">Type <span>*</span></label>
                    <select class="w-100 nice-select" id="type" v-model="params.type" disabled>
                      <option value="1">Learn</option>
                      <option value="2">Blog</option>
                      <option value="3">Note</option>
                    </select>
                  </div>
                  <div class="col-md-6 mb-3"></div>
                  <div class="col-12 mb-3">
                    <label for="intro">Intro <span>*</span></label>
                    <input type="text" class="form-control" id="intro" v-model="params.intro">
                  </div>
                  <div class="col-12 mb-3">
                    <label>Description <span>*</span></label>
                    <quill-editor ref="myTextEditor"
                                  :content="params.content"
                                  :config="editorOption"
                                  @change="onEditorChange($event)">
                    </quill-editor>
                    <mavon-editor v-model="params.content"/>
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
  import 'mavon-editor/dist/css/index.css'
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
        value: ''
      }
    },
    computed: {},
    mounted () {
    },
    created () {
      if (this.$route.params.id!=='create') {
        this.getDetail(this.$route.params.type, this.$route.params.id)
      }
      this.getSTS()
    },
    methods: {
      OSSUploadSuccess (r) {
        if (r && r != '') {
          this.$set(this.params, r.dom_id, r.res.requestUrls[0])
        }
      },
      onEditorChange ({ quill, html, text }) {
        // console.log('editor change!', quill, html, text)
        this.params.content = html
      },
      getDetail (type, id) {
        switch (type) {
          case '1':
            this.$api.get(this.$global.authApiPath, '/learn/get', {id: id}, r => {
              this.params = r.data
            })
            break
          case '2':
            break
          case '3':
            break
        }
      },
      edit (params) {
        if (params.id && params.id!='' && params.id!='create') {
          params.updateBy = this.$store.state.token_info.userId
          params.createDate = ''
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
