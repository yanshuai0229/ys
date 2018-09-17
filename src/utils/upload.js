import Bus from '@/utils/bus'
export function upload (files, config, obj) {
  var file = files
  var type = file.name.split('.')[1]
  var storeAs
  if (config.fileName && config.fileName != '') {
    storeAs = config.fileName + '.' + type
  } else {
    storeAs = new Date().getTime() + '.' + type
  }
  var boolean = true
  if (file.size > config.maxSize) {
    window.alert('文件大小不能超过' + config.maxSize / 1000 + 'kb!')
    file = null
    return false
  }
  if (config.typeArr && config.typeArr.indexOf(type) > 0) {
    boolean = false
  }
  if (boolean) {
    window.alert('上传文件格式不支持!请选择' + config.typeArr)
    file = null
    return false
  }
  var client = new OSS.Wrapper({
    accessKeyId: config.STS[1],
    accessKeySecret: config.STS[2],
    stsToken: config.STS[3],
    endpoint: config.STS[4],
    bucket: config.STS[5]
  })
  var storeDir
  if (config.catalog && config.catalog !== '') {
    storeDir = config.catalog + '/' + storeAs
  } else {
    storeDir = storeAs
  }
  client.multipartUpload(storeDir, file).then(function (result) {
    let uploadIdStatus = result.res.requestUrls[0].indexOf('?uploadId=');
    if (uploadIdStatus !== -1) {
      result.res.requestUrls[0] = result.res.requestUrls[0].substring(0, uploadIdStatus);
    }
    if (obj.type=='md') {
      var res = {url: result.res.requestUrls[0], pos: obj.pos}
      Bus.$emit('MDSuccess', res)
    } else {
      return result.res.requestUrls[0]
    }
  }).catch(function (err) {
    console.log(err)
  })
}
