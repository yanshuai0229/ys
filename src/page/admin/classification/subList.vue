<template>
  <div>
    <!-- ##### List Wrapper Area Start ##### -->
    <div class="blog-wrapper section-padding-100-20">
      <div class="container">
        <div class="row">
          <div class="col-12" v-for="item in list" :key="item.id">
            <ul class="list-group">
              <li class="list-group-item paddingR150">{{item.label}} <span class="list_del" @click="del(item.id)">del</span><span class="list_edit" @click="edit(item.parentId, item.id)">edit</span></li>
            </ul>
          </div>
          <div class="noData" v-if="cnt=='0'"></div>
        </div>
      </div>
    </div>
    <div class="createItem" @click="edit(parentId, 'create')"><span class="createTxt">Create</span></div>
    <!-- ##### List Wrapper Area End ##### -->
  </div>
</template>
<script>
  export default {
    components: { },
    data () {
      return {
        list: [],
        pages: 0,
        cnt: 0,
        parentId: this.$route.params.pid
      }
    },
    computed: {},
    mounted () {
    },
    created () {
      this.getList(this.parentId)
    },
    methods: {
      getList (p_id) {
        this.$api.get(this.$global.authApiPath, '/classification/getSubClassificationList', {id: p_id}, r => {
          if (r.data) {
            this.list = r.data
            this.cnt = this.list.length
          } else {
            this.list = []
            this.cnt = 0
          }
        })
      },
      edit (pid, id) {
        this.$router.push({path: '/admin/classification/model/' + pid + '/' + id})
      },
      del (id) {
        this.$api.get(this.$global.authApiPath, '/classification/del', {id: id}, r => {
          this.getList(this.parentId)
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
