<template>
  <div>
    <a href="javascript:;" v-bind:class="config.style">
      <input id="upload" type="file" v-bind:class="config.style" :accept="config.typeArr" @change="upload($event)" style=" opacity:  0">
      <input type="hidden" id="videoId"/>
      <input type="hidden" id="uploadAuth"/>
      <input type="hidden" id="uploadAddress"/>
      <input type="hidden" id="title"/>
      <input type="hidden" id="accessKeyId" />
      <input type="hidden" id="accessKeySecret" />
      <input type="hidden" id="secretToken" />
    </a>
    <div class="progressBar">
      <!-- set progressbar -->
      <vue-progress-bar></vue-progress-bar>
    </div>
    <p v-if="percent !== 0">上传进度:{{percent}}</p>
  </div>
</template>
<script>

import 'es6-promise'
export default {
  name: 'UploadVod',
  props: ['uploadVodConf'],
  data () {
    return {
      config: this.uploadVodConf,
      percent: 0
    }
  },
  mounted: function () {
  },
  methods: {
    upload (event) {
      var self = this
      var uploader = new AliyunUpload.Vod({
        // 文件上传失败
        'onUploadFailed': function (uploadInfo, code, message) {
          self.$Progress.fail()
          console.log('onUploadFailed: file:' + uploadInfo.file.name + ',code:' + code + ', message:' + message)
        },
        // 文件上传完成
        'onUploadSucceed': function (uploadInfo) {
          self.$emit('success', uploadInfo)
          self.$Progress.finish()
          // console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
        },
        // 文件上传进度
        'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
          self.percent = (loadedPercent * 100.00).toFixed(2) + '%'
          self.$Progress.increase((loadedPercent * 100.00).toFixed(2))
          console.log('onUploadProgress:file:' + uploadInfo.file.name + ', fileSize:' + totalSize + ', percent:' + (loadedPercent * 100.00).toFixed(2) + '%')
        },
        // STS临时账号会过期，过期时触发函数
        'onUploadTokenExpired': function (uploadInfo) {
          // console.log("onUploadTokenExpired");
          /* if (isVodMode()) {
            // 实现时，根据uploadInfo.videoId从新获取UploadAuth
            // 实际环境中调用点播的刷新上传凭证接口，获取凭证
            // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
            // 获取上传凭证后，调用setUploadAuthAndAddress
            // uploader.resumeUploadWithAuth(uploadAuth);
          } else if (isSTSMode()) {
            // 实现时，从新获取STS临时账号用于恢复上传
            // uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expireTime);
          } */
        },
        'onUploadCanceled': function (uploadInfo) {
          // console.log("onUploadCanceled:file:" + uploadInfo.file.name);
        },
        // 开始上传
        'onUploadstarted': function (uploadInfo) {
          if (self.config.mode === 'VodMode') {
            var uploadAuth, uploadAddress, videoId
            if (!uploadInfo.videoId) {
              uploadAuth = document.getElementById('uploadAuth').value
              uploadAddress = document.getElementById('uploadAddress').value
              videoId = document.getElementById('videoId').value
              uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
            } else {
              uploadAuth = document.getElementById('uploadAuth').value
              uploadAddress = document.getElementById('uploadAddress').value
              uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress)
            }
          } else if (self.config.mode === 'STSMode') {
            var accessKeyId = document.getElementById('accessKeyId').value
            var accessKeySecret = document.getElementById('accessKeySecret').value
            var secretToken = document.getElementById('secretToken').value
            uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken, 'test')
            //  start the progress bar
            self.$Progress.start()
          }
          // console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
        },
        'onUploadEnd': function (uploadInfo) {
          // console.log("onUploadEnd: uploaded all the files");
        }
      })
      var myfile = event.target.files
      console.log(this.config)
      if (myfile.length !== 0) {
        var userData
        if (this.config.mode === 'VodMode') {
          var VideoId = this.config.Auth[0]
          var title = this.config.Auth[1]
          var UploadAuth = this.config.Auth[2]
          var UploadAddress = this.config.Auth[3]

          $('#videoId').val(VideoId)
          $('#title').val(title)
          $('#uploadAuth').val(UploadAuth)
          $('#uploadAddress').val(UploadAddress)
          userData = '{"Vod":{"UserData":{"IsShowWaterMark":"false","Priority":"7"}}}'

          uploader.addFile(myfile[0], null, null, null, userData)
          uploader.startUpload()
          document.getElementById('upload').value = null
        }
        if (this.config.mode === 'STSMode') {
          var STS = {
            accessKeyId: this.config.STS[1],
            accessKeySecret: this.config.STS[2],
            stsToken: this.config.STS[3],
            endpoint: '',
            bucket: ''
          }
          $('#accessKeyId').val(STS.accessKeyId)
          $('#accessKeySecret').val(STS.accessKeySecret)
          $('#secretToken').val(STS.stsToken)
          userData = '{"Vod":{"Title":"课件视频","Description":"课件描述","UserData":"user data"}}'
          var object = ''
          uploader.addFile(myfile[0], STS.endpoint, STS.bucket, object, userData)
          uploader.startUpload()
          document.getElementById('upload').value = null
        }
      }
    }
  }
}
</script>
<style scoped>
  @import '../assets/upload/upload.css';
</style>
