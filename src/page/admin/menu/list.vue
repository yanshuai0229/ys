<template>
  <div>
    <!-- ##### List Wrapper Area Start ##### -->
    <div class="blog-wrapper section-padding-100-20">
      <div class="container">
        <div class="row">
          <!-- Single Blog Area -->
          <div class="col-12 col-lg-4" v-for="item in list" :key="item.id">
            <div class="single-blog-area mb-50">
              <img  v-if="item.cover && item.cover!==''" :src="item.cover" alt="" class="list_img" @click="goList(item.link, item.id)">
              <img v-if="!item.cover || item.cover===''" src="@/assets/images/core-img/default_cover.jpg" alt="" class="list_img" @click="goList(item.link, item.id)">
              <!-- Post Title -->
              <div class="post-title-ys">
                {{item.title}}
              </div>
              <span class="edit" @click="edit(item.id)"></span>
              <span class="del" @click="del(item.id)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="createItem" @click="edit('create')"><span class="createTxt">Create</span></div>
    <!-- ##### List Wrapper Area End ##### -->
  </div>
</template>
<script>
  export default {
    components: { },
    data () {
      return {
        list: []
      }
    },
    computed: {},
    mounted () {
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.$api.post(this.$global.authApiPath, '/menu/list', {}, r => {
          this.list = r.data
        })
      },
      edit (id) {
        this.$router.push({path: '/admin/menu/model/' + id})
      },
      del (id) {
        this.$api.get(this.$global.authApiPath, '/menu/del', {id: id}, r => {
          this.getList()
        })
      },
      goList (link) {
        this.$router.push({path: link})
      }
    }
  }
</script>

<style lang="scss">
</style>
