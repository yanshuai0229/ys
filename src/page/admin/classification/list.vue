<template>
  <div>
    <!-- ##### List Wrapper Area Start ##### -->
    <div class="blog-wrapper section-padding-100-20">
      <div class="container">
        <div class="row">
          <div class="col-12" v-for="item in list" :key="item.id">
            <ul class="list-group">
              <li class="list-group-item paddingR240">{{item.label}} <span class="list_del" @click="del(item.id)">del</span><span class="list_edit" @click="edit(item.parentId, item.id)">edit</span><span v-if="item.parentId=='0'" class="list_add" @click="add(item.value)">subclassification</span></li>
            </ul>
          </div>
          <div class="noData" v-if="cnt=='0'"></div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="zy_list_bottom" v-if="cnt>filter.pageSize">
            <dl>
              <dd>
                <paginate :click-handler="clickCallback" :page-count=pages
                          :container-class=$global.paginationOptions.container_class :page-class=$global.paginationOptions.page_class :page-link-class=$global.paginationOptions.page_link_class
                          :prev-class=$global.paginationOptions.prev_class :prev-link-class=$global.paginationOptions.prev_link_class
                          :next-class=$global.paginationOptions.next_class :next-link-class=$global.paginationOptions.next_link_class
                          :first-last-button=$global.paginationOptions.first_last_button
                          :active-class=$global.paginationOptions.active_class
                          :disabled-class=$global.paginationOptions.disabled_class
                          :first-button-text=$global.paginationOptions.first_button_text
                          :last-button-text=$global.paginationOptions.last_button_text
                          :prev-text=$global.paginationOptions.prev_text
                          :next-text=$global.paginationOptions.next_text>
                </paginate>
              </dd>
            </dl>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="createItem" @click="edit('0', 'create')"><span class="createTxt">Create</span></div>
    <!-- ##### List Wrapper Area End ##### -->
  </div>
</template>
<script>
  import Paginate from 'vuejs-paginate'
  export default {
    components: { Paginate },
    data () {
      return {
        filter: {
          pageNo: 1,
          pageSize: this.$global.paginationOptions.page_num,
          delFlag: '0',
          parentId: '0'
        },
        list: [],
        pages: 0,
        cnt: 0
      }
    },
    computed: {},
    mounted () {
    },
    created () {
      this.getList(this.filter)
    },
    methods: {
      clickCallback (pageNum) {
        this.filter.pageNo = pageNum
        this.getList(this.filter)
      },
      getList (filter) {
        this.$api.post(this.$global.authApiPath, '/classification/list', filter, r => {
          this.list = r.data
          this.cnt = r.cntData
          this.pages = Math.ceil(this.cnt/this.filter.pageSize)
        })
      },
      edit (pid, id) {
        this.$router.push({path: '/admin/classification/model/' + pid + '/' + id})
      },
      add (pid) {
        this.$router.push({path: '/admin/classification/subList/' + pid})
      },
      del (id) {
        this.$api.get(this.$global.authApiPath, '/classification/del', {id: id}, r => {
          this.getList(this.filter)
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
