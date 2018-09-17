<template>
  <a>
    <a href="javascript:;" v-bind:class="config.style" v-if="config.showMode==='1'">
      <input :id="dom_id" type="file" v-bind:class="config.style" :accept="config.typeArr" @change="upload($event)" style="position: absolute; top: 0; left: 0; display: block; width: inherit; height: inherit; opacity: 0;">
    </a>
    <a v-if="config.showMode==='2'" href="javascript:;" class="file">选择文件<input :id="dom_id" :accept="config.typeArr" @change="upload($event)"  type="file" name="questionFile" class="valid"></a>
  </a>
</template>
<script>
export default {
  name: 'UploadOSS',
  props: ['uploadOSSConf', 'DOM_ID'],
  data () {
    return {
      config: this.uploadOSSConf,
      dom_id: this.DOM_ID
    }
  },
  methods: {
    // 产生随机数函数
    randomFunc (n) {
      var randomNum='';
      for (var i=0; i<n; i++) { randomNum += Math.floor(Math.random()*10); }
      return randomNum
    },
    upload (event) {
      var self = this
      var file = event.target.files[0]
      var type = file.name.split('.')[1]
      var storeAs
      if (this.config.fileName && this.config.fileName != '') {
        storeAs = this.config.fileName + '.' + type
      } else {
        storeAs = new Date().getTime() + this.randomFunc(6) + '.' + type
      }
      var boolean = true
      if (file.size > this.config.maxSize) {
        window.alert('文件大小不能超过' + this.config.maxSize / 1000 + 'kb!')
        event.target.value = null
        return false
      }
      if (this.config.typeArr && this.config.typeArr.indexOf(type) > 0) {
        boolean = false
      }
      if (boolean) {
        window.alert('上传文件格式不支持!请选择' + this.config.typeArr)
        event.target.value = null
        return false
      }
      self.$emit('getFile', file)
      this.client = new OSS.Wrapper({
        accessKeyId: this.config.STS[1],
        accessKeySecret: this.config.STS[2],
        stsToken: this.config.STS[3],
        endpoint: this.config.STS[4],
        bucket: this.config.STS[5]
      })
      var storeDir
      if (this.config.catalog && this.config.catalog !== '') {
        storeDir = this.config.catalog + '/' + storeAs
      } else {
        storeDir = storeAs
      }
      this.client.multipartUpload(storeDir, file).then(function (result) {
        let uploadIdStatus = result.res.requestUrls[0].indexOf('?uploadId=');
        if (uploadIdStatus !== -1) {
          result.res.requestUrls[0] = result.res.requestUrls[0].substring(0, uploadIdStatus);
        }
        result.dom_id = self.dom_id
        self.$emit('success', result)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
  @import './upload.css';
</style>
